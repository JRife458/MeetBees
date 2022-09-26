const express = require('express');
const { Event, EventImage, User, Group, Venue, sequelize, Attendance } = require('../../db/models');
const { Op } = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const membership = require('../../db/models/membership');

const router = express.Router();

// Errors
const noEventErr = new Error("Event couldn't be found")
noEventErr.title = ("Event couldn't be found")
noEventErr.status = 404
noEventErr.errors = ['No events with provided id']

const noVenueErr = new Error("Venue couldn't be found")
noVenueErr.title = ("Venue couldn't be found")
noVenueErr.status = 404
noVenueErr.errors = ['No venues with provided id']

const noAttendanceErr = new Error("Attendance couldn't be found")
noAttendanceErr.title = ("Attendance couldn't be found")
noAttendanceErr.status = 404
noAttendanceErr.errors = ["Attendance between the user and the event does not exist"]

// Get all Events
router.get('/', async (req, res) => {
  let events = await Event.findAll({
    raw: true
  })

  let previews = await EventImage.findAll({
    where: {preview: true},
    raw: true
  })

  let groups = await Group.findAll({
    attributes: ['id', 'name', 'city', 'state'],
    raw: true
  })

  let venues = await Venue.findAll({
    attributes: ['id', 'city', 'state'],
    raw: true
  })

  for (let i = 0; i < events.length; i++) {
    const {count} = await Attendance.findAndCountAll({
      where: {eventId: events[i].id},
      raw: true
    })
    events[i].numAttending = count
    for (let j = 0; j < previews.length; j++) {
      if (previews[j].eventId === events[i].id) {
        events[i].previewImage = previews[j].url
      }
    }
    for (let j = 0; j < groups.length; j++) {
      if (events[i].groupId === groups[j].id) {
        events[i].Group = groups[j]
      }
    }
    for (let j = 0; j < venues.length; j++) {
      if (events[i].venueId === venues[j].id) {
        events[i].Venue = venues[j]
      }
    }
    if (events[i].type === 'Online') {
      events[i].Venue = null
    }
  }
  return res.json({Events: events})
})

// Get event by Id
router.get('/:eventId', async (req, res, next) => {
  let event = await Event.findByPk(req.params.eventId, {raw: true})
  if (!event) return next(noEventErr)
  const {count} = await Attendance.findAndCountAll({
    where: {eventId: event.id},
    raw: true
  })
  event.numAttending = count

  event.Group = await Group.findByPk(event.groupId, {
    attributes: ['id', 'name', 'private', 'city', 'state']
  })

  if (event.type === 'In person') {
    event.Venue = await Venue.findByPk(event.venueId, {
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
  } else event.Venue = null

  event.EventImages = await EventImage.findAll({
    where: {eventId: event.id},
    attributes: ['id', 'url', 'preview']
  })

  return res.json(event)
})



//Add an Image to an Event
router.post('/:eventId/images', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)
  const {url, preview} = req.body
  const newImage = await EventImage.create({
    eventId: event.id,
    url,
    preview
  })
  return res.json({
    "id": newImage.id,
    "url": newImage.url,
    "preview": newImage.preview
  })
})

// Edit an Event by Id
router.put('/:eventId', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId, {
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  if (!event) return next(noEventErr)
  const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body


  if (venueId) {
    let venue = await Venue.findByPk(venueId)
    if (!venue) return next(noVenueErr)
    else event.venueId = venueId
  }
  if (name) {
    event.name = name
  }
  if (type) {
    event.type = type
  }
  if (capacity) {
    event.capacity = capacity
  }
  if (price) {
    event.price = price
  }
  if (description) {
    event.description = description
  }
  if (startDate) {
    event.startDate = startDate
  }
  if (endDate) {
    event.endDate = endDate
  }
  await event.save()
  return res.json(event)
})

//Delete an Event
router.delete('/:eventId', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)

  await event.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

//Get all Attendees of an Event
router.get('/:eventId/attendees', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)
  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    include: {model: Attendance,
    as: 'Attendees',
    where: {eventId: req.params.eventId},
    attributes: ['status']
  }
  })
  return res.json(users)
})

// Request to attend an event
router.post('/:eventId/attendance', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)
  const exists = await Attendance.findAll({
    where: {userId: req.user.id, eventId: event.id}
  })
  if (exists.length) {
    res.status(400)
    const error = {
      "message": "Attendance has already been requested",
      "statusCode": 400
    }
    return res.json(error)
  }
  await Attendance.create({
    userId: req.user.id,
    eventId: event.id,
    status: 'pending'
  })
  return res.json({
    "eventId": event.id,
    "userId": req.user.id,
    "status": "pending"
  })
})

// Change status of Attendance
router.put('/:eventId/attendance', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)

  const attendance = await Attendance.findOne({
    attributes: ['id', 'eventId', 'userId', 'status'],
    where: {userId: req.body.userId, eventId: req.params.eventId}
  })
  if (!attendance) return next(noAttendanceErr)

  attendance.status = req.body.status
  await attendance.save()

  return res.json(attendance)
})

// Delete an attendance
router.delete('/:eventId/attendance', async (req, res, next) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) return next(noEventErr)
  const attendance = await Attendance.findOne({
    attributes: ['id', 'eventId', 'userId', 'status'],
    where: {userId: req.body.userId, eventId: req.params.eventId}
  })
  if (!attendance) return next(noAttendanceErr)

  await attendance.destroy()
  return res.json({
    "message": "Successfully deleted attendance from event"
  })
})


module.exports = router;

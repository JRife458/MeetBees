const express = require('express');
const { Event, EventImage, User, Group, Venue, sequelize, Attendance } = require('../../db/models');
const { Op } = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Events
router.get('/', async (req, res) => {
  let events = await Event.findAll({
    raw: true
  })

  let previews = await EventImage.findAll({
    where: {preview: true},
    attributes: ['eventId', 'url'],
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
router.get('/:eventId', async (req, res) => {
  let event = await Event.findByPk(req.params.eventId, {raw: true})
  if (!event) {
    res.status(404)
    const error = {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  const {count} = await Attendance.findAndCountAll({
    where: {eventId: event.id},
    raw: true
  })
  event.numAttending = count

  event.Group = await Group.findByPk(event.groupId, {
    attributes: ['id', 'name', 'private', 'city', 'state']
  })

  if (event.type === 'In Person') {
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
router.post('/:eventId/images', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) {
    res.status(404)
    const error = {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
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
router.put('/:eventId', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  if (!event) {
    res.status(404)
    const error = {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body


  if (venueId) {
    let venue = await Venue.findByPk(venueId)
    if (!venue) {
      res.status(404)
    const error = {
      "message": "Venue couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
    } else event.venueId = venueId
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
  return res.json(event)
})

//Delete an Event
router.delete('/:eventId', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId)
  if (!event) {
    res.status(404)
    const error = {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  console.log(event)
  await event.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;

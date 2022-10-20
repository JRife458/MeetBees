const express = require('express');
const { User, Group, sequelize, GroupImage, Venue, Membership, Event, Attendance, EventImage, GroupMembers } = require('../../db/models');
const { Op } = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateGroupCreate = [
  check('name')
  .exists({ checkFalsy: true })
  .isLength({ max: 60 })
  .withMessage('Name must be 60 characters or less'),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage('About must be 50 characters or more'),
    check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
    .isBoolean()
    .withMessage('Private must be a boolean'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    handleValidationErrors
  ];

  const validateImageCreate = [
    check('url')
    .exists({ checkFalsy: true })
    .withMessage('Must provide a url'),
    check('preview')
    .isBoolean()
    .withMessage('Preview must be a boolean'),
    handleValidationErrors
  ]

  //Errors
  const noGroupErr = new Error("Group couldn't be found")
  noGroupErr.title = ("Group couldn't be found")
  noGroupErr.status = 404
  noGroupErr.errors = ['No Groups with provided id']

  // Get all groups
  router.get('/', async (req, res) => {
    let groups = await Group.findAll({
      raw: true
    })

    let previews = await GroupImage.findAll({
      where: {preview: true},
      attributes: ['groupId', 'url'],
      raw: true
    })


    // GROSS
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].private === 0) groups[i].private = false
      if (groups[i].private === 1) groups[i].private = true
      const {count} = await Membership.findAndCountAll({
        where: {groupId: groups[i].id},
        raw: true
      })
      groups[i].numMembers = count
      for (let j = 0; j < previews.length; j++) {
        if (previews[j].groupId === groups[i].id) {
          groups[i].previewImage = previews[j].url
      }
    }
  }
  return res.json({ Groups: groups})
});

// Get Group from current user
router.get('/current', async (req, res) => {
  const { user } = req;
  const currentId = user.id;

  let Groups = []

  let memberships = await Membership.findAll({
    where: {userId: currentId}
  })


  for (let i = 0; i < memberships.length; i++) {
    let groupId = memberships[i].groupId
    let group = await Group.findByPk(groupId, {raw: true})

    const {count} = await Membership.findAndCountAll({
      where: {groupId: groupId},
      raw: true
    })
    group.numMembers = count

    if (group.private === 1) group.private = true
    else if (group.private === 0) group.private = false

    const image = await GroupImage.findOne({
      where: {groupId: group.id, preview: true},
    })

    group.previewImage = image.url
    Groups.push(group)
  }
  return res.json({Groups})
});

//Get Group details by id
router.get('/:groupId', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId, {
    raw: true
  })
  if (!group) return next(noGroupErr)

  if (group.private === 1) group.private = true
  else if (group.private === 0) group.private = false
  const {count} = await Membership.findAndCountAll({
    where: {groupId: group.id},
    raw: true
  })
  let user = await User.findByPk(group.organizerId)
  let organizer = {
    'id': group.organizerId,
    'firstName': user.firstName,
    'lastName': user.lastName
  }
  let images = await GroupImage.findAll({
    where: {groupId: group.id},
    attributes: ['id', 'url', 'preview']
  })
  let venues = await Venue.findAll({
    where: {groupId: group.id},
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  group.numMembers = count
  group.GroupImages = images
  group.Organizer = organizer
  group.Venues = venues
  return res.json(group)
})

// Create Group
router.post('/',
validateGroupCreate,
async (req, res, next) => {
  const { user } = req;
  const currentId = user.id;
  const { name, about, type, private, city, state } = req.body
  if (await Group.findOne({where: {name: name}})) {
    const err = new Error("Group with that name already exists");
    err.status = 403;
    err.title = 'Group Creation Failed';
    err.errors = ['Group with that name already exists.'];
    return next(err);
  }
  const newGroup = await Group.create({
    organizerId: currentId,
    name,
    about,
    type,
    private,
    city,
    state
  })
  await Membership.create({
    userId: currentId,
    groupId: newGroup.id,
    status: 'cohost'
  })
  return res.json(newGroup)
});

// Create image for group
router.post('/:groupId/images',
validateImageCreate,
async (req, res, next) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }

  const { url, preview } = req.body
  const newImage = await GroupImage.create({
    url,
    preview,
    groupId: req.params.groupId
  })

  return res.json(newImage)
})

// Edit a group
router.put('/:groupId', async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body
  if (await Group.findOne({where: {name: name}})) {
    const err = new Error("Group with that name already exists");
    err.status = 403;
    err.title = 'Group Creation Failed';
    err.errors = ['Group with that name already exists.'];
    return next(err);
  }
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }
  let errorRes = {
    "message": "Validation Error",
    "statusCode": 400
  }

  if (name !== undefined) {
    if (name.length > 60) {
      res.status(400)
      errorRes.errors = { "name": "Name must be 60 characters or less" }
      return res.json(errorRes)
    } else group.name = name
  }
  if (about !== undefined) {
    if (about.length < 50) {
      res.status(400)
      errorRes.errors = { "about": "About must be 50 characters or more" }
      return res.json(errorRes)
    } else group.about = about
  }
  if (type !== undefined) {
    if (type !== "Online" && type !== "In person") {
      res.status(400)
      errorRes.errors = { "type": "Type must be 'Online' or 'In person'" }
      return res.json(errorRes)
    } else group.type = type
  }
  if (private !== undefined) {
    if (private !== true && private !== false) {
      res.status(400)
      errorRes.errors = { "private": "Private must be a boolean" }
      return res.json(errorRes)
    } else group.private = private
  }
  if (city !== undefined) {
    if (!city.length) {
      res.status(400)
      errorRes.errors = { "city": "City is required" }
      return res.json(errorRes)
    } else group.city = city
  }
  if (state !== undefined) {
    if (!state.length) {
      res.status(400)
      errorRes.errors = { "state": "State is required" }
      return res.json(errorRes)
    } else group.state = state
  }
  await group.save()
  return res.json({Group: group})
})

// Delete a Group
router.delete('/:groupId', async (req, res, next) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }
  await group.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

// Get all venues for group
router.get('/:groupId/venues', async (req, res) => {
  let venues = await Venue.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: {groupId: req.params.groupId}
  })

  return res.json({Venues: venues})
})

// Add a venue to a group
router.post('/:groupId/venues',
 async (req, res, next) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }

  const {address, city, state, lat, lng} = req.body
  let newVenue = await Venue.create({
    groupId: group.id,
    address,
    city,
    state,
    lat,
    lng
  })

  return res.json(newVenue)
})

// Get all events for group
router.get('/:groupId/events', async (req, res, next) => {
  let events = await Event.findAll({
    where: {groupId: req.params.groupId},
    raw: true
  })

  let previews = await EventImage.findAll({
    where: {preview: true},
    attributes: ['eventId', 'url'],
    raw: true
  })

  let group = await Group.findByPk(req.params.groupId, {
    attributes: ['id', 'name', 'city', 'state'],
    raw: true
  })
  if (!group) return next(noGroupErr)

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
    events[i].Group = group
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

// Create an Event for Group by Id
router.post('/:groupId/events', async (req, res, next) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }
  const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body
  let newEvent = await Event.create({
    groupId: group.id,
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate
  })
  await Attendance.create({
    userId: currentId,
    eventId: newEvent.id,
    status: 'member'
  })
  return res.json(newEvent)
})

//Get members of group
router.get('/:groupId/members', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  const members = await User.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    include: {model: Membership,
      as: 'Membership',
      where: {groupId: req.params.groupId},
      attributes: ['status']
    }
  })
  return res.json(members)
})

// Request Membership of group
router.post('/:groupId/membership', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  const exists = await Membership.findAll({
    where: {userId: req.user.id, groupId: group.id}
  })
  if (exists.length) {
    res.status(400)
    const error = {
      "message": "Membership has already been requested",
      "statusCode": 400
    }
    return res.json(error)
  }
  let membership = await Membership.create({
    userId: req.user.id,
    groupId: group.id,
    status: 'pending'
  })
  return res.json({
    'groupId': group.id,
    'memberId': membership.userId,
    'status': membership.status
  })
})

// Change Membership Status
router.put('/:groupId/membership', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  const user = await User.findByPk(req.body.memberId)
  if (!user) {
    res.status(404)
    const error = {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  const membership = await Membership.findOne({
    where: {userId: req.body.memberId, groupId: group.id}
  })
  if (!membership) {
    res.status(404)
    const error = {
      "message": "Membership between the user and the group does not exits",
      "statusCode": 404
    }
    return res.json(error)
  }

  membership.status = 'member'

  await membership.save()
  return res.json({
    "id": membership.id,
    "groupId": membership.groupId,
    "memberId": membership.userId,
    "status": membership.status
  })
})

//Delete Membership
router.delete('/:groupId/membership', async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId)
  if (!group) return next(noGroupErr)
  const user = await User.findByPk(req.body.memberId)
  if (!user) {
    res.status(404)
    const error = {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  let membership = await Membership.findOne({
    where: {userId: req.body.memberId, groupId: group.id}
  })
  if (!membership) {
    res.status(404)
    const error = {
      "message": "Membership does not exist for this User",
      "statusCode": 404
    }
    return res.json(error)
  }
  await membership.destroy()
  return res.json({
    "message": "Successfully deleted membership from group"
  })
})



module.exports = router;

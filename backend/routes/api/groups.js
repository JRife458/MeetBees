const express = require('express');
const { User, Group, sequelize, GroupImage, Venue, Membership } = require('../../db/models');
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
    .exists({ checkFalsy: true })
    .withMessage('Preview must be a boolean'),
  handleValidationErrors
]

// Get all groups
router.get('/', async (req, res) => {
  let groups = await Group.findAll({
    include: [
      {model: User, attributes: []}
    ],
    attributes:
      {include:
        [
          [sequelize.fn('count', sequelize.col('User.id')), 'numMembers']
        ]
      },
    group: ['Group.id'],
    raw: true
  })

  let previews = await GroupImage.findAll({
    where: {preview: true},
    attributes: ['groupId', 'url'],
    raw: true
  })


  // GROSS
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < previews.length; j++) {
      if (previews[j].groupId === groups[i].id) {
        groups[i].previewImage = previews[j].url
        console.log(groups[i].previewImage)
      }
    }
  }
  return res.json({ Groups: groups})
  }

);

// Get Group from current user
router.get('/current', async (req, res) => {
  const { user } = req;
  const currentId = user.id;
  console.log(user.id)
  let groups = await Group.findAll({
    include: [
      {model: User, attributes: [], where: {id: currentId}}
    ],
    attributes:
      {include:
        [
          [sequelize.fn('count', sequelize.col('User.id')), 'numMembers']
        ]
      },
    raw: true
  })

  let previews = await GroupImage.findAll({
    where: {preview: true},
    attributes: ['groupId', 'url'],
    raw: true
  })


  // GROSS
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < previews.length; j++) {
      if (previews[j].groupId === groups[i].id) {
        groups[i].previewImage = previews[j].url
        console.log(groups[i].previewImage)
      }
    }
  }
  return res.json({ Groups: groups})
});

//Get Group details by id
router.get('/:groupId', async (req, res) => {
  const group = await Group.findByPk(req.params.groupId, {
    raw: true
  })
  if (!group) {
    res.status(404)
    const error = {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }

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
    exclude: ['createdAt', 'updatedAt']
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
  async (req, res) => {
  const { user } = req;
  const currentId = user.id;
  const { name, about, type, private, city, state } = req.body
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
async (req, res) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404)
    const error = {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
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
router.put('/:groupId', async (req, res) => {
  const { name, about, type, private, city, state } = req.body
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404)
    const error = {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
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
  return res.json({Group: group})
})

// Delete a Group
router.delete('/:groupId', async (req, res) => {
  const { user } = req
  const currentId = user.id
  const group = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404)
    const error = {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  if (group.organizerId !== currentId) {
    throw new Error('Current user is not the organizer for this group')
  }
  await group.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;

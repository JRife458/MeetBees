const express = require('express');
const { User, Group, sequelize, GroupImage, Venue, Membership } = require('../../db/models');
const { Op } = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Edit a Venue

router.put('/:venueId', async (req, res) => {
  let venue = await Venue.findByPk(req.params.venueId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  if (!venue) {
    res.status(404)
    const error = {
      "message": "Venue couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }

  const {address, city, state, lat, lng} = req.body
  if (address !== undefined) {
    venue.address = address
  }
  if (city !== undefined) {
    venue.city = city
  }
  if (state !== undefined) {
    venue.state = state
  }
  if (lat !== undefined) {
    venue.lat = lat
  }
  if (lng !== undefined) {
    venue.lng = lng
  }
  return res.json(venue)
})


module.exports = router;

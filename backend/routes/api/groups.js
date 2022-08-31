const express = require('express');
const { User, Group, sequelize, GroupImage, Membership } = require('../../db/models');
const { Op } = require('sequelize')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

module.exports = router;

const express = require('express');
const {EventImage} = require('../../db/models');
const router = express.Router();

// delete an event image
router.delete('/:imageId', async (req, res) => {
  const image = await EventImage.findByPk(req.params.imageId)
  if (!image) {
    res.status(404)
    const error = {
      "message": "Event Image couldn't be found",
      "statusCode": 404
    }
    return res.json(error)
  }
  await image.destroy()
  return res.json({
    "message": "Successfully deleted"
  })
})
module.exports = router;

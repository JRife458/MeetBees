const express = require('express');
const {GroupImage} = require('../../db/models');
const router = express.Router();

// delete a group image
router.delete('/:imageId', async (req, res) => {
  const image = await GroupImage.findByPk(req.params.imageId)
  if (!image) {
    res.status(404)
    const error = {
      "message": "Group Image couldn't be found",
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

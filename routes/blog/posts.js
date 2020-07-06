const express = require('express')
const router = express.Router()

router.get('/posts', function(req, res, next) {
  res.json({Iae: 'iae'})
})

module.exports = router

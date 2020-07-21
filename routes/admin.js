const express = require('express')
const Admin = require('../models/admin')
const router = express.Router()

router.get('/', function (req, res, next) {
  Admin.findOne()
    .lean({ virtuals: true })
    .exec((err, admin) => {
      if (err) { return next(err) }
      if (!admin) { return res.status(500).json({ message: 'Crie a conta de administrador.' }) }
      delete admin.email;
      delete admin.password;
      res.json(admin)
    })
})

module.exports = router

const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Owner = require('../models/owner')
const router = express.Router();

router.post('/', function (req, res, next) {
  Owner.findOne({ email: req.body.email })
    .lean({ virtuals: true })
    .exec((err, account) => {
      if (err) { return next(err) }
      if (!account) { return res.status(401).json({ message: 'E-mail incorreto.' }) }

      if (bcrypt.compareSync(req.body.password, account.password)) {
        const token = jwt.sign({ id: account._id, email: account.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        console.log('JWT ', token)
        return res.json({ message: 'Autenticado!', token })
      } else {
        return res.status(401).json({ message: 'Senha incorreta.' })
      }
    })
})

module.exports = router;

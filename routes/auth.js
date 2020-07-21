const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/admin')
const router = express.Router();

router.post('/', function (req, res, next) {
  Admin.findOne({ email: req.body.email })
    .lean({ virtuals: true })
    .exec((err, account) => {
      if (err) { return next(err) }
      if (!account) { return res.status(401).json({ message: 'E-mail incorreto.' }) }

      if (bcrypt.compareSync(req.body.password, account.password)) {
        let exp2Days = 2*24*60*60
        const token = jwt.sign({ id: account._id, email: account.email }, process.env.TOKEN_SECRET, { expiresIn: exp2Days })
        return res.json({ message: 'Autenticado!', token , expiration: Date.now()+(exp2Days*1000)})
      } else {
        return res.status(401).json({ message: 'Senha incorreta.' })
      }
    })
})



module.exports = router;

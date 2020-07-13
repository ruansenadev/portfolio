const express = require('express');
const Owner = require('../models/owner')
const bcrypt = require('bcryptjs')
const router = express.Router();

router.post('/', function(req, res, next) {
  Owner.findOne({email: req.body.email})
  .lean({virtuals: true})
  .exec((err, account) => {
    if(err) {return next(err)}
    if (!account) {return res.status(401).json({message: 'E-mail incorreto.'})}

    if (bcrypt.compareSync(req.body.password, account.password)) {
      return res.json({message: 'Autenticado com sucesso'})
    } else {
      return res.status(401).json({message: 'Senha incorreta.'})
    }
  })
})

module.exports = router;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../admin/admin');
const { body, validationResult } = require('express-validator');

exports.login = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }
    Admin.findOne({ email: req.body.email })
      .lean({ virtuals: true })
      .exec((err, account) => {
        if (err) { return res.status(502).json({ message: 'Falha ao logar' }); }
        if (!account) { return res.status(401).json({ message: 'E-mail incorreto.' }); }

        if (bcrypt.compareSync(req.body.password, account.password)) {
          let exp2Days = 2 * 24 * 60 * 60;
          const token = jwt.sign({ id: account._id, email: account.email },
            process.env.TOKEN_SECRET,
            { expiresIn: exp2Days }
          );
          return res.json({ message: 'Autenticado!', token, expiration: Date.now() + (exp2Days * 1000) });
        } else {
          return res.status(401).json({ message: 'Senha incorreta' });
        }
      });
  }
];

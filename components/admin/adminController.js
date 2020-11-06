const { verify } = require('../auth/authService');
const Admin = require('./admin');
const md5 = require('md5');
const { compareSync, hashSync } = require('bcryptjs');
const { param, query, validationResult } = require('express-validator');
const { IncomingForm } = require('formidable');

exports.readAdmin = [
  query('gravatar').optional().toBoolean(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Algo deu errado' });
    }
    Admin.findOne()
      .lean({ virtuals: true })
      .exec((err, admin) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar conta' }); }
        if (!admin) { return res.status(500).json({ message: 'Crie uma conta admin' }); }
        if (req.query.gravatar) {
          const gravatar = `https://www.gravatar.com/avatar/${md5(admin.email.toLowerCase())}?s=200&d=identicon`;
          return res.json(gravatar);
        }
        delete admin.password;
        return res.json(admin);
      });
  }
];

exports.createAdmin = function (req, res) {
  const form = new IncomingForm();
  form.onPart = (part) => {
    if (part.filename === '' || !part.mime) {
      form.handlePart(part);
    }
  };
  form.parse(req, function (err, fields) {
    if (err) { return res.status(400).json({ message: 'Formulário inválido' }); }
    let admin = new Admin({
      name: fields.name,
      last_name: fields.last_name,
      birthdate: new Date(fields.birthdate),
      address: {},
      email: fields.email,
      password: hashSync(fields.password, 10),
      photo: (
        fields.photo ?
          fields.photo :
          `https://www.gravatar.com/avatar/${md5(fields.email.toLowerCase())}?s=200&d=identicon`),
      profession: fields.profession,
      biodata: fields.biodata
    });
    if (fields.city) admin.address.city = fields.city;
    if (fields.state) admin.address.state = fields.state;
    if (fields.logo) admin.logo = fields.logo;
    if (fields.nickname) admin.nickname = fields.nickname;
    if (fields.skills) admin.skills = JSON.parse(fields.skills);
    if (fields.social) admin.social = JSON.parse(fields.social);
    admin.save((err) => {
      if (err) { return res.status(502).json({ message: 'Falha ao criar' }); }
      return res.status(200).json({ message: 'Conta admin criada!' });
    });
  });
}

exports.updateAdmin = [
  verify,
  param('id').isMongoId(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const form = new IncomingForm();
    form.onPart = (part) => {
      if (part.filename === '' || !part.mime) {
        form.handlePart(part);
      }
    };
    Admin.findById(req.params.id)
      .exec((err, admin) => {
        if (err | !admin) { return res.status(502).json({ message: 'Falha ao encontrar conta' }); }
        form.parse(req, function (err, fields) {
          if (err) { return res.status(400).json({ message: 'Formulário inválido' }); }
          if (fields.photo) {
            admin.photo = fields.photo;
            admin.updateOne(admin, (err, result) => {
              if (err || !result.n) { return res.status(502).json({ message: 'Falha ao salvar' }); }
              return res.status(200).json({ message: 'Foto atualizada!' });
            })
          } else if (fields.logo) {
            admin = new Admin(admin);
            admin.logo = fields.logo;
            admin.updateOne(admin, (err, result) => {
              if (err || !result.n) { return res.status(502).json({ message: 'Falha ao salvar' }); }
              return res.status(200).json({ message: 'Logotipo atualizado' });
            })
          } else if (fields.email || fields.password_new) {
            if (compareSync(fields.password, admin.password)) {
              admin = new Admin(admin);
              admin.email = fields.email;
              if (fields.password_new) admin.password = bcrypt.hashSync(fields.password_new, 10);
              admin.updateOne(admin, (err, result) => {
                if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }); }
                return res.status(200).json({ message: 'Credenciais atualizadas' });
              })
            } else {
              return res.status(401).json({ message: 'Senha atual incorreta' });
            }
          } else {
            admin = new Admin({
              _id: req.params.id,
              name: fields.name || admin.name,
              last_name: fields.last_name || admin.last_name,
              birthdate: fields.birthdate ? new Date(fields.birthdate) : admin.birthdate,
              email: admin.email,
              password: admin.password,
              photo: admin.photo,
              biodata: fields.biodata || admin.biodata,
              profession: fields.profession || admin.profession,
              logo: admin.logo,
              skills: fields.skills ? JSON.parse(fields.skills) : admin.skills,
              social: fields.social ? JSON.parse(fields.social) : admin.social
            });
            if (fields.city || fields.state) {
              if (fields.city) admin.address.city = fields.city;
              if (fields.state) admin.address.state = fields.state;
              admin.markModified('address');
            }
            admin.updateOne(admin, (err, result) => {
              if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }); }
              return res.status(200).json({ message: 'Dados atualizados!' });
            })
          }
        });
      });
  }
];

exports.deleteAdmin = [
  verify,
  param('id').isMongoId(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    Admin.deleteOne({ _id: req.params.id }, (err) => {
      if (err) { return res.status(502).json({ message: 'Falha ao deletar' }); }
      return res.status(200).json({ message: 'Conta deletada.' });
    })
  }
];

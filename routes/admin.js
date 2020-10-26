const express = require('express')
const Auth = require('../middlewares/auth')
const Admin = require('../models/admin')
const md5 = require('md5')
const bcrypt = require('bcryptjs')
const { param, validationResult } = require('express-validator')
const router = express.Router()

const { IncomingForm } = require('formidable')
const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

router.get('/', function (req, res) {
  Admin.findOne()
    .lean({ virtuals: true })
    .exec((err, admin) => {
      if (err) { return res.status(502).json({ message: 'Falha ao buscar conta' }) }
      if (!admin) { return res.status(500).json({ message: 'Crie a conta de administrador' }) }
      if (req.query.gravatar) {
        const gravatar = `https://www.gravatar.com/avatar/${md5(admin.email.toLowerCase())}?s=200&d=identicon`
        return res.json(gravatar)
      }
      delete admin.password;
      res.json(admin)
    })
})
router.post('/', Auth, function (req, res) {
  const form = new IncomingForm();
  form.onPart = (part) => {
    if (part.filename === '' || !part.mime) {
      form.handlePart(part);
    }
  }
  form.parse(req, function (err, fields) {
    if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
    let admin = new Admin({
      name: fields.name,
      last_name: fields.last_name,
      birthdate: new Date(fields.birthdate),
      address: {},
      email: fields.email,
      password: bcrypt.hashSync(fields.password, 10),
      photo: fields.photo ? `/images/${fields.photo}` : `https://www.gravatar.com/avatar/${md5(fields.email.toLowerCase())}?s=200&d=identicon`,
      profession: fields.profession,
      biodata: fields.biodata
    })
    if (fields.city) admin.address.city = fields.city
    if (fields.state) admin.address.state = fields.state
    if (fields.logo) admin.logo = `/images/${fields.logo}`
    if (fields.nickname) admin.nickname = fields.nickname
    if (fields.skills) admin.skills = JSON.parse(fields.skills)
    if (fields.social) admin.social = JSON.parse(fields.social)
    admin.save((err) => {
      if (err) { return res.status(502).json({ message: 'Falha ao criar' }) }
      res.status(200).json({ message: 'Conta administrador criada!' })
    })
  })
})

router.put('/:id', Auth, function (req, res) {
  const form = new IncomingForm()
  form.onPart = (part) => {
    if (part.filename === '' || !part.mime) {
      form.handlePart(part);
    }
  }
  Admin.findById(req.params.id)
    .exec((err, admin) => {
      if (err | !admin) { return res.status(502).json({ message: 'Falha ao encontrar conta' }) }
      form.parse(req, function (err, fields) {
        if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
        if (fields.photo) {
          admin.photo = `/images/${fields.photo}`
          admin.updateOne(admin, (err, result) => {
            if (err || !result.n) { return res.status(502).json({ message: 'Falha ao salvar' }) }
            return res.status(200).json({ message: 'Foto atualizada!' })
          })
        } else if (fields.photo) {
          admin.photo = fields.photo
          admin.updateOne(admin, (err, result) => {
            if (err || !result.n) { return res.status(502).json({ message: 'Falha ao salvar' }) }
            return res.status(200).json({ message: 'Foto atualizada!' })
          })
        } else if (fields.logo) {
          admin = new Admin(admin)
          admin.logo = `/images/${fields.logo}`
          admin.updateOne(admin, (err, result) => {
            if (err || !result.n) { return res.status(502).json({ message: 'Falha ao salvar' }) }
            return res.status(200).json({ message: 'Logotipo atualizado' })
          })
        } else if (fields.email || fields.password_new) {
          if (bcrypt.compareSync(fields.password, admin.password)) {
            admin = new Admin(admin)
            admin.email = fields.email
            if (fields.password_new) admin.password = bcrypt.hashSync(fields.password_new, 10)
            admin.updateOne(admin, (err, result) => {
              if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }) }
              return res.status(200).json({ message: 'Credenciais atualizadas' })
            })
          } else {
            return res.status(401).json({ message: 'Senha incorreta' })
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
          })
          if (fields.city || fields.state) {
            if (fields.city) admin.address.city = fields.city
            if (fields.state) admin.address.state = fields.state
            admin.markModified('address')
          }
          admin.updateOne(admin, (err, result) => {
            if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }) }
            res.status(200).json({ message: 'Dados atualizados!' })
          })
        }
      })
    })
})
router.delete('/:id', Auth, [
  param('id').isMongoId(),
  function (req, res) {
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' })
    }
    Admin.deleteOne({ _id: req.params.id }, (err) => {
      if (err) { return res.status(502).json({ message: 'Falha ao deletar' }) }
      res.status(200).json({ message: 'Conta deletada.' })
    })
  }
])

module.exports = router

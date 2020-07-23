const express = require('express')
const Counter = require('../models/counter')
const Project = require('../models/project')
const Auth = require('../middlewares/auth')
const path = require('path')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Bahia').locale('pt-br')
const router = express.Router()

const counterId = 'Project'

const { IncomingForm } = require('formidable')
const projectFormOptions = {
  uploadDir: path.join(__dirname, '../public', 'images', 'album'),
  keepExtensions: true,
  maxFileSize: 20 * 1024 * 1024,
  multiples: false
}
const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

router.get('/', function (req, res, next) {
  const items = +req.query.items
  const left = +req.query.left
  Project.find({})
    .skip(left * items)
    .limit(items)
    .lean()
    .sort('-seq')
    .exec((err, projects) => {
      if (err) { return next(err) }
      res.json(projects)
    })
})
router.get('/:slug', function (req, res, next) {
  Project.findOne({ slug: req.params.slug })
    .lean()
    .exec((err, project) => {
      if (err) { return next(err) }
      if (!project) { return res.status(404).json({ message: 'Projeto inexistente.' }) }
      res.json(project)
    })
})
router.post('/', Auth, function (req, res, next) {
  const form = new IncomingForm(projectFormOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      if (!allowedTypes.includes(part.mime)) {
        req.destroy()
        return res.status(406).json({ message: 'Mime-type inválido.' })
      }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { return next(err) }
    let project = new Project({
      name: fields.name,
      status: fields.status,
      description: fields.description,
      technologies: JSON.parse(fields.technologies),
      url: fields.url,
      keywords: JSON.parse(fields.keywords)
    })
    if (files.thumbnail) project.thumbnailPath = `${req.protocol}://${req.get('host')}/images/album/${dateUpload}-${files.thumbnail.name}`;
    if (fields.homepage) project.homepage = fields.homepage;
    Counter.findByIdAndUpdate(counterId, { $inc: { seq: 1 } }, { new: true })
      .then((counter) => {
        project.seq = counter.seq
        project.save((err, projectSaved) => {
          if (err) { return next(err) }
          res.json({ message: 'Projeto adicionado!', project: projectSaved })
        })
      })
      .catch(next)
  })
})
router.put('/:id', Auth, function (req, res, next) {
  const form = new IncomingForm(projectFormOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      if (!allowedTypes.includes(part.mime)) {
        req.destroy()
        return res.status(406).json({ message: 'Mime-type inválido.' })
      }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { next(err) }
    let project = new Project({
      _id: fields._id,
      seq: +fields.seq,
      name: fields.name,
      status: fields.status,
      description: fields.description,
      technologies: JSON.parse(fields.technologies),
      url: fields.url,
      keywords: JSON.parse(fields.keywords)
    })
    if (files.thumbnail) project.thumbnailPath = `${req.protocol}://${req.get('host')}/images/album/${dateUpload}-${files.thumbnail.name}`;
    if (fields.thumbnailPath) project.thumbnailPath = fields.thumbnailPath;
    if (fields.homepage) project.homepage = fields.homepage;
    Project.updateOne({ _id: req.params.id }, project, (err, result) => {
      if (err) { return next(err) }
      if (!result.n) { return res.status(400).json({ message: 'Falha ao atualizar.' }) }
      res.json({ message: 'Projeto atualizado!' })
    })
  })
})
router.delete('/:id', Auth, function (req, res) {
  Project.deleteOne({ _id: req.params.id }, (err) => {
    if (err) { return res.status(400).json({ message: 'Falha ao deletar.' }) }
    res.json({ message: 'Projeto deletado.' })
  })
})

module.exports = router

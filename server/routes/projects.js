const express = require('express')
const Counter = require('../models/counter')
const Project = require('../models/project')
const Auth = require('../middlewares/auth')
const PathDir = require('../middlewares/pathdir')
const path = require('path')
const { query, param, validationResult } = require('express-validator')
const async = require('async')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Bahia').locale('pt-br')
const router = express.Router()

const counterId = 'Project'

const { IncomingForm } = require('formidable')
const projectFormOptions = {
  keepExtensions: true,
  maxFileSize: 20 * 1024 * 1024,
  multiples: false
}
const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

router.get('/', [
  query(['behind', 'items']).isAlphanumeric().toInt(),
  function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Falha ao requisitar projetos' })
    }
    Project.find()
      .lean()
      .sort('-seq')
      .skip(req.query.behind)
      .limit(req.query.items + 1)
      .exec((err, projects) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar projetos' }) }
        let hasMore = false
        if (projects.length > req.query.items) {
          projects.pop()
          hasMore = true
        }
        res.json({ projects, hasMore })
      })
  }
])
router.get('/:seq', [
  param('seq').isAlphanumeric().toInt(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Número de projeto incorreto' })
    }
    Project.findOne({ seq: req.params.seq })
      .lean()
      .exec((err, project) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar' }) }
        if (!project) { return res.status(404).json({ message: 'Projeto inexistente' }) }
        res.json(project)
      })
  }
])
router.post('/', Auth, PathDir(undefined, 'images', 'album'), function (req, res) {
  projectFormOptions.uploadDir = req.pathDir
  const form = new IncomingForm(projectFormOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      if (!allowedTypes.includes(part.mime)) {
        req.destroy()
        return res.status(415).json({ message: 'Mime-type inválido' })
      }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
    let project = new Project({
      name: fields.name,
      status: fields.status,
      description: fields.description,
      technologies: JSON.parse(fields.technologies),
      url: fields.url,
      keywords: JSON.parse(fields.keywords)
    })
    if (files.thumbnail) project.thumbnailPath = `/images/album/${dateUpload}-${files.thumbnail.name}`;
    if (fields.overview) project.overview = fields.overview;
    if (fields.homepage) project.homepage = fields.homepage;
    Counter.findById(counterId)
      .then((projectCount) => {
        project.seq = projectCount.seq
        project.save()
          .then((projectSaved) => {
            projectCount.updateOne({ seq: projectCount.seq + 1 })
              .then(() => {
                res.status(200).json({ message: 'Projeto adicionado!', project: projectSaved })
              }).catch(() => {
                projectSaved.deleteOne((err) => {
                  if (err) { return res.status(502).json({ message: 'Falha, delete o projeto da DB!' }) }
                  res.status(502).json({ message: 'Falha ao salvar' })
                })
              })
          })
      }).catch(() => { return res.status(502).json({ message: 'Falha ao salvar' }) })
  })
})
router.put('/:id', Auth, [
  param('id').isMongoId(),
  PathDir(undefined, 'images', 'album'),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' })
    }
    projectFormOptions.uploadDir = req.pathDir
    const form = new IncomingForm(projectFormOptions)
    const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
    form.on("fileBegin", function (filename, file) {
      file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
    })
    form.onPart = (part) => {
      if (part.mime) {
        if (!allowedTypes.includes(part.mime)) {
          req.destroy()
          return res.status(415).json({ message: 'Mime-type inválido' })
        }
      }
      form.handlePart(part)
    }
    form.parse(req, function (err, fields, files) {
      if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
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
      if (files.thumbnail) project.thumbnailPath = `/images/album/${dateUpload}-${files.thumbnail.name}`;
      if (fields.thumbnailPath) project.thumbnailPath = fields.thumbnailPath;
      if (fields.overview) project.overview = fields.overview;
      if (fields.homepage) project.homepage = fields.homepage;
      Project.updateOne({ _id: req.params.id }, project, (err, result) => {
        if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }) }
        res.status(200).json({ message: 'Projeto atualizado!' })
      })
    })
  }
])
router.delete('/:id', Auth, [
  param('id').isMongoId(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' })
    }
    async.parallel({
      projectDeleted: function (cb) {
        Project.findByIdAndDelete({ _id: req.params.id }, { select: 'seq' }, (cb))
      },
      last: function (cb) {
        Counter.findById(counterId, cb)
      }
    }, (err, results) => {
      if (err || !results.projectDeleted) { return res.status(400).json({ message: 'Falha ao deletar' }) }
      if (results.last.seq === results.projectDeleted.seq) {
        Counter.updateOne({ _id: counterId }, { $inc: { seq: -1 } }, (err) => {
          if (err) { return res.status(502).json({ message: `Falha ao atualizar sequência ${results.projectDeleted.seq}` }) }
          res.status(200).json({ message: `Último projeto deletado.` })
        })
      } else {
        res.status(200).json({ message: `Projeto ${results.projectDeleted.seq} deletado.` })
      }
    })
  }
])

module.exports = router

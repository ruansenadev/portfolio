const express = require('express')
const Post = require('../models/post')
const Auth = require('../middlewares/auth')
const path = require('path')
const moment = require('moment')
const router = express.Router()

const { IncomingForm } = require('formidable')
const formOptions = {
  uploadDir: path.join(__dirname, '../public', 'images'),
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024,
  multiples: false
}
const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

router.get('/', function (req, res, next) {
  const items = +req.query.items
  const left = +req.query.left
  Post.countDocuments()
    .then((count) => {
      Post.find({})
        .skip(left * items)
        .limit(items)
        .lean()
        .exec((err, posts) => {
          if (err) { return next(err) }
          res.json({ posts, max: count })
        })
    })
    .catch(next)
})
router.get('/:slug', function (req, res, next) {
  Post.findOne({ slug: req.params.slug })
    .lean({ virtuals: true })
    .exec((err, post) => {
      if (err) { return next(err) }
      if (!post) { return res.status(404).json({ message: 'Post não existe.' }) }
      res.json(post)
    })
})
router.post('/', Auth, function (req, res, next) {
  const form = new IncomingForm(formOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    // keep name uploaded
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      // check mimetype
      if (!allowedTypes.includes(part.mime)) { return res.status(406).json({ message: 'Mime-type inválido.' }) }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { next(err) }
    let post = new Post({
      title: fields.title,
      date: new Date(fields.date),
      markdown: fields.markdown,
      labels: JSON.parse(fields.labels)
    })
    if (files.thumbnail) post.thumbnailPath = `${req.protocol}://${req.get('host')}/images/${dateUpload}-${files.thumbnail.name}`;
    if (fields.icon) post.icon = fields.icon;
    if (fields.description) post.description = fields.description;
    post.save((err, postSaved) => {
      if (err) { return next(err) }
      Post.countDocuments().then((count) => {
        res.json({ message: 'Post adicionado!', post: postSaved, max: count })
      }).catch(next)
    })
  })
})
router.put('/:id', Auth, function (req, res, next) {
  const form = new IncomingForm(formOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      if (!allowedTypes.includes(part.mime)) { return res.status(406).json({ message: 'Mime-type inválido.' }) }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { next(err) }
    let post = new Post({
      _id: fields._id,
      title: fields.title,
      date: new Date(fields.date),
      icon: fields.icon,
      markdown: fields.markdown,
      modified: new Date(fields.modified),
      labels: JSON.parse(fields.labels)
    })
    if (files.thumbnail) post.thumbnailPath = `${req.protocol}://${req.get('host')}/images/${dateUpload}-${files.thumbnail.name}`;
    if (fields.thumbnailPath) post.thumbnailPath = fields.thumbnailPath;
    if (fields.description) post.description = fields.description;
    Post.updateOne({ _id: req.params.id }, post, (err, result) => {
      if (err) { return next(err) }
      if (!result.n) { return res.status(400).json({ message: 'Falha ao atualizar.' }) }
      res.json({ message: 'Post atualizado!' })
    })
  })
})
router.delete('/:id', Auth, function (req, res) {
  Post.deleteOne({ _id: req.params.id }, (err) => {
    if (err) { return res.status(400).json({ message: 'Falha ao deletar.' }) }
    res.json({ message: 'Post deletado.' })
  })
})

module.exports = router

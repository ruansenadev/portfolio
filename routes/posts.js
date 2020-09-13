const express = require('express')
const Post = require('../models/post')
const Auth = require('../middlewares/auth')
const PathDir = require('../middlewares/pathdir')
const path = require('path')
const { query, param, validationResult } = require('express-validator')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Bahia').locale('pt-br')
const router = express.Router()

const { IncomingForm } = require('formidable')
const postFormOptions = {
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024,
  multiples: false
}
const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

router.get('/', [
  query(['items', 'left']).isAlphanumeric().toInt(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Paginação incorreta' })
    }
    Post.countDocuments()
      .then((count) => {
        Post.find({})
          .skip(req.query.left * req.query.items)
          .limit(req.query.items)
          .lean({ virtuals: true })
          .sort('-date')
          .then((posts) => {
            res.json({ posts, max: count })
          })
      })
      .catch(() => { return res.status(502).json({ message: 'Falha ao buscar posts' }) })
  }
])
router.get('/archives', [
  function (req, res) {
    Post.aggregate([
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: { year: '$_id.year' },
          months: {
            $push: {
              month: {
                $let: {
                  vars: {
                    monthsNames: [, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
                  },
                  in: {
                    $arrayElemAt: ['$$monthsNames', '$_id.month']
                  }
                }
              },
              count: '$count'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          months: '$months'
        }
      }
    ])
      .exec((err, archives) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar arquivos' }) }
        res.json(archives)
      })
  }
])
router.get('/:slug', [
  param('slug').isSlug(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Titulo de post inválido' })
    }
    Post.findOne({ slug: req.params.slug })
      .lean({ virtuals: true })
      .exec((err, post) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar' }) }
        if (!post) { return res.status(404).json({ message: 'Post não existe' }) }
        res.json(post)
      })
  }
])
router.post('/', Auth, PathDir(undefined, 'images', 'blog'), function (req, res) {
  postFormOptions.uploadDir = req.pathDir
  const form = new IncomingForm(postFormOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    // keep name uploaded
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      // check mimetype
      if (!allowedTypes.includes(part.mime)) {
        req.destroy()
        return res.status(415).json({ message: 'Mime-type inválido' })
      }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
    let post = new Post({
      title: fields.title,
      date: new Date(fields.date),
      markdown: fields.markdown,
      labels: JSON.parse(fields.labels)
    })
    if (files.thumbnail) post.thumbnailPath = `${req.protocol}://${req.get('host')}/images/blog/${dateUpload}-${files.thumbnail.name}`;
    if (fields.icon) post.icon = fields.icon;
    if (fields.description) post.description = fields.description;
    post.save((err, postSaved) => {
      if (err) { return res.status(502).json({ message: 'Falha ao salvar' }) }
      Post.countDocuments().then((count) => {
        res.status(200).json({ message: 'Post adicionado!', post: postSaved, max: count })
      }).catch(() => { return res.status(502).json({ message: 'Falha ao atualizar' }) })
    })
  })
})
router.put('/:id', Auth, PathDir(undefined, 'images', 'blog'), function (req, res) {
  postFormOptions.uploadDir = req.pathDir
  const form = new IncomingForm(postFormOptions)
  const dateUpload = moment().format('DD-MM-YYYY-hh-mm-ss')
  form.on("fileBegin", function (filename, file) {
    file.path = path.join(form.uploadDir, `${dateUpload}-${file.name}`)
  })
  form.onPart = (part) => {
    if (part.mime) {
      if (!allowedTypes.includes(part.mime)) { return res.status(415).json({ message: 'Mime-type inválido' }) }
    }
    form.handlePart(part)
  }
  form.parse(req, function (err, fields, files) {
    if (err) { return res.status(400).json({ message: 'Formulário inválido' }) }
    let post = new Post({
      _id: fields._id,
      title: fields.title,
      date: new Date(fields.date),
      icon: fields.icon,
      markdown: fields.markdown,
      modified: new Date(fields.modified),
      labels: JSON.parse(fields.labels)
    })
    if (files.thumbnail) post.thumbnailPath = `${req.protocol}://${req.get('host')}/images/blog/${dateUpload}-${files.thumbnail.name}`;
    if (fields.thumbnailPath) post.thumbnailPath = fields.thumbnailPath;
    if (fields.description) post.description = fields.description;
    Post.updateOne({ _id: req.params.id }, post, (err, result) => {
      if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }) }
      res.status(200).json({ message: 'Post atualizado!' })
    })
  })
})
router.delete('/:id', Auth, [
  param('id').isMongoId(),
  function (req, res) {
    Post.deleteOne({ _id: req.params.id }, (err) => {
      if (err) { return res.status(502).json({ message: 'Falha ao deletar' }) }
      res.status(200).json({ message: 'Post deletado.' })
    })
  }
])

module.exports = router

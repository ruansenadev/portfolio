const express = require('express')
const Post = require('../models/post')
const router = express.Router()

router.get('/', function (req, res, next) {
  const items = +req.query.items || 5;
  const left = +req.query.left || 0;
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
router.post('/', function (req, res, next) {
  const post = new Post({
    title: req.body.title,
    date: req.body.date,
    markdown: req.body.markdown,
    labels: req.body.labels
  })
  if (req.body.icon) post.icon = req.body.icon;
  if (req.body.description) post.description = req.body.description;
  post.save((err, postSaved) => {
    if (err) { return next(err) }
    Post.countDocuments().then((count) => {
      res.json({ message: 'Post created', post: postSaved , max: count})
    }).catch(next)
  })
})
router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id).lean().exec((err, post) => {
    if (err) { return next(err) }
    res.json({ post })
  })
})
router.put('/:id', function (req, res, next) {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    date: req.body.date,
    icon: req.body.icon,
    markdown: req.body.markdown,
    modified: req.body.modified,
    labels: req.body.labels
  })
  if (req.body.description) post.description = req.body.description;
  Post.updateOne({ _id: req.params.id }, post, (err, result) => {
    if (err) { return next(err) }
    if (!result.n) { return res.status(400).json({ message: 'Failed to update' }) }
    res.json({ message: 'Post updated' })
  })
})
router.delete('/:id', function (req, res) {
  Post.deleteOne({ _id: req.params.id }, (err) => {
    if (err) { return res.status(400).json({ message: 'Failed to delete' }) }
    res.json({ message: 'Post deleted' })
  })
})

module.exports = router
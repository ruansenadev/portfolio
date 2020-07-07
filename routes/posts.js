const express = require('express')
const Post = require('../models/post')
const router = express.Router()

router.get('/', function(req, res, next) {
  Post.find({})
  .lean()
  .exec((err, posts) => {
    if(err) { return next(err) }
    res.json(posts)
  })
})

router.post('/', function(req, res, next) {
  console.log('Body ', req.body)
  const post = new Post({
    title: req.body.title,
    date: req.body.date,
    markdown: req.body.content,
  })
  if (req.body.description) post.description = req.body.description;
  post.save((err) => {
    if(err) {return next(err)}
    res.json({message: 'Post created'})
  })
})

module.exports = router

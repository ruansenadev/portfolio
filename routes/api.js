const express = require('express')
const router = express.Router()
const postsRouter = require('./blog/posts')

router.get('/posts', postsRouter)

module.exports = router;

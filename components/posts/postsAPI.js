const { Router } = require('express');
const controller = require('./postsController');
const router = Router();

router.get('/', controller.readPosts);

router.get('/archives', controller.getArchives);

router.get('/:slug', controller.readPost);

router.post('/', controller.createPost);

router.put('/:id', controller.updatePost);

router.delete('/:id', controller.deletePost);

module.exports = router;

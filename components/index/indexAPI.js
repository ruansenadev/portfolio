const { Router } = require('express');
const router = Router();
// paths
const adminAPI = require('../admin/adminAPI');
const authAPI = require('../auth/authAPI');
const postsAPI = require('../posts/postsAPI');
const projectsAPI = require('../projects/projectsAPI');
const storageAPI = require('../storage/storageAPI');

router.use('/', storageAPI);
router.use('/admin', adminAPI);
router.use('/auth', authAPI);
router.use('/posts', postsAPI);
router.use('/projects', projectsAPI);
router.use('/admin', adminAPI);

module.exports = router;
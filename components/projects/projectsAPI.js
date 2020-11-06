const { Router } = require('express');
const controller = require('./projectsController');
const router = Router();

router.get('/', controller.readProjects);

router.get('/seqs', controller.getSequences);

router.get('/:seq', controller.readProject);

router.post('/', controller.createProject);

router.put('/:id', controller.updateProject);

router.delete('/:id', controller.deleteProject);

module.exports = router;

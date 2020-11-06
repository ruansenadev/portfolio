const { Router } = require('express');
const controller = require('./adminController');
const router = Router();

router.get('/', controller.readAdmin);

router.post('/', controller.createAdmin);

router.put('/:id', controller.updateAdmin);

router.delete('/:id', controller.deleteAdmin);

module.exports = router;

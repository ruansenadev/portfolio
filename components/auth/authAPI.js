const { Router } = require('express');
const controller = require('./authController');
const router = Router();

router.post('/', controller.login);

module.exports = router;

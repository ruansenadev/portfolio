const { Router } = require('express');
const controller = require('./storageController');
const router = Router();

router.get('/sign-s3', controller.getSignedUrl);

module.exports = router;

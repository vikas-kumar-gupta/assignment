const express = require('express');
const router = express.Router();
const {getMiddleware} = require('../middleware')
const testController = require('../controller/test');


router.get('/middleware', getMiddleware, testController.testFunction);

module.exports = router;
const express = require('express');
const router = express.Router();
const DBController = require('../controller/db');

router.get('/', DBController.getDB);
router.get('/', DBController.postDB);
router.get('/', DBController.putDB);
router.get('/', DBController.patchDB);
router.get('/', DBController.deleteDB);

module.exports = router;
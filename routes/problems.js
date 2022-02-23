const express = require('express');
const router = express.Router();
const problemController = require('../controller/problems')
const problemString = require('../sortString')

router.post('/water-level', problemController.waterLevel);
router.post('/fibonacci', problemController.fibonacci);  
router.get('/missing-num', problemController.missingNum);
router.post('/sort-string', problemString)

module.exports = router;
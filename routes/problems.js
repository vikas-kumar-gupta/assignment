const express = require('express');
const router = express.Router();
const problemController = require('../controller/problems')

router.post('/water-level', problemController.waterLevel)
router.post('/fibonacci', problemController.fibonacci);  
router.get('/missing-num', problemController.missingNum);
router.post('/sort-string', problemController.sortString)

module.exports = router;
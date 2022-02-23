const express = require('express');
const router = express.Router();
const calcController = require('../controller/calc');

router.post('/basic/sum', calcController.sum);
router.post('/basic/sub', calcController.sub);
router.post('/basic/mul', calcController.mul);
router.post('/basic/div', calcController.div);

router.post('/advance/sin', calcController.sin);
router.post('/advance/cos', calcController.cos);
router.post('/advance/sqrt', calcController.sqrt);
router.post('/advance/cbrt', calcController.cbrt)


module.exports = router;
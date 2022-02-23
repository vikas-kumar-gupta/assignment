const express = require('express');
const router = express.Router();
const {getMiddleware} = require('../middleware')
// const testController = require('../controller/test');


router.get('/middleware', getMiddleware, getMiddleware, (req, res) => {
    res.send(`inside the testFunction`);
});

module.exports = router;
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

//creates an new user account in the data base
router.post("/signup", userCtrl.createUser);

//generic API test
router.use('/', userCtrl.testAPI);

module.exports = router;
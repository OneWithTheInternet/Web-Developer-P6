const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

//creates an new user account in the data base
router.post("/signup", userCtrl.createUser);

//logs users in
router.post('/login', userCtrl.login);

module.exports = router;
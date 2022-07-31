const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

//Responds by sending back all the sauce type items in the database
router.get('/', auth, sauceCtrl.sendAll);

module.exports = router;
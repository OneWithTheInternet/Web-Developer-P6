const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Adds a new sauce in the database
router.post('/', auth, multer, sauceCtrl.createSauce);

//Responds by sending back all the sauce type items in the database
router.get('/', auth, sauceCtrl.displayAll);

router.get('/:id', auth, sauceCtrl.displayOne);

router.post('/:id/like', auth, sauceCtrl.changeLikeState);

router.put("/:id", auth, multer, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);


module.exports = router;
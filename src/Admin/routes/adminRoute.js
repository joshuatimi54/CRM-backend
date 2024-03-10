const express = require('express');
const { createAdmin, adminLogin, cookieHanlder, userLogout } = require('../controller/adminCtrl');
const router  = express.Router();

router.post('/signup', createAdmin);
router.post('/signin', adminLogin);

router.get('/ref', cookieHanlder);
router.get('/logout', userLogout);

module.exports = router;
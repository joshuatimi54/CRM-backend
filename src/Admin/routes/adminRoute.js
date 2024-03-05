const express = require('express');
const { createAdmin, adminLogin } = require('../controller/adminCtrl');
const router  = express.Router();

router.post('/signup', createAdmin);
router.post('/signin', adminLogin);

module.exports = router;
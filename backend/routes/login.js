const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');
const verifyUser = require('../library/verify');

router.post('/', verifyUser.isLogout, loginController.loginAuth);

router.post('/logout', loginController.logout);

module.exports = router;

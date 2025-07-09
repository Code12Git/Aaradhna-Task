const express = require('express');
const { authController } = require('../controllers');
const verifyData = require('../middleware/verifyData')
const registerValidation = require('../validations/auth/registerValidation')
const loginValidation = require('../validations/auth/loginValidation')
const router = express.Router();

router.post('/register',verifyData(registerValidation),authController.register)
router.post('/login',verifyData(loginValidation),authController.login)

module.exports = router
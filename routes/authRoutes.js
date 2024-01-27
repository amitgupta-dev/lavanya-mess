const express = require('express')
const router = express.Router()
const { signup } = require('../controllers/auth/signup')
const { login } = require('../controllers/auth/login')
const { logout } = require('../controllers/auth/logout')
const { forgotPassword } = require('../controllers/auth/forgotPassword')
const { verifyEmailOtp } = require('../controllers/auth/verifyEmailOtp')
const { changePassword } = require('../controllers/auth/changePassword')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotPassword').post(forgotPassword)
router.route('/verifyEmailOtp').post(verifyEmailOtp)
router.route('/changePassword').patch(changePassword)

module.exports = router
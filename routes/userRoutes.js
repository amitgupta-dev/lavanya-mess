const express = require('express')
const router = express.Router()
const { getAuthenticatedUser } = require('../controllers/user/getAuthenticatedUser')
const { updateUser } = require('../controllers/user/updateUser')
const { deleteUser } = require('../controllers/user/deleteUser')
const { searchUsers } = require('../controllers/user/searchUser')
const { getUser } = require('../controllers/user/getUser')

router.route('/').get(getAuthenticatedUser)
router.route('/').patch(updateUser)
router.route('/').delete(deleteUser)
router.route('/search').get(searchUsers)
router.route('/:id').get(getUser)

module.exports = router
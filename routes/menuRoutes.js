const express = require('express')
const router = express.Router()

const { createMenu } = require('../controllers/menu/createMenu')
const { getMenus } = require('../controllers/menu/getMenus')
const { updateMenu } = require('../controllers/menu/updateMenu')
const { deleteMenu } = require('../controllers/menu/deleteMenu')

router.route('/').post(createMenu)
router.route('/search').get(getMenus)
router.route('/:id').get(getMenus)
router.route('/:id').patch(updateMenu)
router.route('/:id').delete(deleteMenu)

module.exports = router
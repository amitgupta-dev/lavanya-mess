const express = require('express')
const router = express.Router()

const { createOrder } = require('../controllers/order/createOrder')
const { getOrders } = require('../controllers/order/getOrders')
const { updateOrder } = require('../controllers/order/updateOrder')
const { deleteOrder } = require('../controllers/order/deleteOrder')

router.route('/').post(createOrder)
router.route('/search').get(getOrders)
router.route('/:id').get(getOrders)
router.route('/:id').patch(updateOrder)
router.route('/:id').delete(deleteOrder)

module.exports = router
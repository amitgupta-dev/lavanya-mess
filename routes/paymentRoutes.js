const express = require('express')
const router = express.Router()

const { createPayment } = require('../controllers/payment/createPayment')
const { getPayments } = require('../controllers/payment/getPayments')
const { updatePayment } = require('../controllers/payment/updatePayment')
const { deletePayment } = require('../controllers/payment/deletePayment')

router.route('/').post(createPayment)
router.route('/search').get(getPayments)
router.route('/:id').get(getPayments)
router.route('/:id').patch(updatePayment)
router.route('/:id').delete(deletePayment)

module.exports = router
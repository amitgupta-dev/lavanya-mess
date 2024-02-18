const express = require('express')
const router = express.Router()

const { createSubscription } = require('../controllers/subscription/createSubscription')
const { getSubscriptions } = require('../controllers/subscription/getSubscriptions')
const { updateSubscription } = require('../controllers/subscription/updateSubscription')
const { deleteSubscription } = require('../controllers/subscription/deleteSubscription')

router.route('/').post(createSubscription)
router.route('/search').get(getSubscriptions)
router.route('/:id').get(getSubscriptions)
router.route('/:id').patch(updateSubscription)
router.route('/:id').delete(deleteSubscription)


module.exports = router
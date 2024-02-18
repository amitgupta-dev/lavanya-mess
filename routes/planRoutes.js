const express = require('express')
const router = express.Router()

const { createPlan } = require('../controllers/plan/createPlan')
const { getPlans } = require('../controllers/plan/getPlans')
const { updatePlan } = require('../controllers/plan/updatePlan')
const { deletePlan } = require('../controllers/plan/deletePlan')

router.route('/').post(createPlan)
router.route('/search').get(getPlans)
router.route('/:id').get(getPlans)
router.route('/:id').patch(updatePlan)
router.route('/:id').delete(deletePlan)


module.exports = router
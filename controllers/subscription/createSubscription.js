const Subscription = require('../../models/subscription')
const asyncHandler = require('../../utils/asyncHandler')

const createSubscription = asyncHandler(async (req, res) => {
    const {
        plan,
        payment,
        status,
        startDate,
        endDate,
        destination
    } = req.body

    if (!(plan && payment && status && startDate && endDate && destination)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newSubscription = new Subscription({
        createdBy: req.user.id,
        plan,
        payment,
        status,
        startDate,
        endDate,
        destination
    })

    const createdSubscription = await newSubscription.save()
    return res.status(201).json({
        success: 'true',
        message: 'Subricption created successfully',
        SubscriptionDetails: createdSubscription
    })
})

module.exports = { createSubscription }
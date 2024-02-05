const Subscription = require('../../models/subscription')
const asyncHandler = require('../../utils/asyncHandler')

const createSubscription = asyncHandler(async (req, res) => {
    const {
        plan,
        methodOfPayment,
        startDate,
        endDate,
        location
    } = req.body

    const newSubscription = new Subscription({
        createdBy,
        plan,
        amount,
        methodOfPayment,
        startDate,
        endDate,
        location
    })

    const createdSubscription = await newSubscription.save()
    return res.status(200).json({
        success: 'true',
        message: 'Rated successfully',
        SubscriptionDetails: createdSubscription
    })
})
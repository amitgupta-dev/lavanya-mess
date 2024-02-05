const Subscription = require('../../models/subscription')
const asyncHandler = require('../../utils/asyncHandler')

const deleteSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { createdBy, plan, amount, status, startBetween, endBetween, createdBetween, locationBetween } = req.query

    const searchedSubscriptions = await Subscription.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Subscriptions Fetched successfully',
        deleteResponse: searchedSubscriptions
    })
})

module.exports = deleteSubscription
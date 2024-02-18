const Subscription = require('../../models/subscription')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updateSubscription = asyncHandler(async (req, res) => {
    const {
        plan,
        payment,
        status,
        startDate,
        endDate,
        destination } = req.body

    let searchedSubscription = await Subscription.findById(req.Subscription.id)

    if (!searchedSubscription) return res.status(404).json({
        success: false,
        message: 'Subscription not found'
    })

    if (plan) searchedSubscription.plan = plan
    if (payment) searchedSubscription.payment = payment
    if (status) searchedSubscription.status = status
    if (startDate) searchedSubscription.startDate = startDate
    if (endDate) searchedSubscription.endDate = endDate
    if (destination) searchedSubscription.destination = destination

    let updatedSubscription = await searchedSubscription.save()

    console.log(updatedSubscription)

    return res.status(200).json({
        success: true,
        message: "Subscription updated successfully",
        Subscription: updatedSubscription
    })
})

module.exports = { updateSubscription }
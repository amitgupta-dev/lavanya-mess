const Subscription = require('../../models/subscription')
const asyncHandler = require('../../utils/asyncHandler')

const getSubscriptions = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (id) {
        const searchedSubscription = await Subscription.findById({ _id: id })

        if (!searchedSubscription) {
            return res.status(404).json({
                success: false,
                message: "subscription not found"
            })
        }

        return res.status(200).json({
            success: 'true',
            message: 'Subscription Fetched successfully',
            subscription: searchedSubscription
        })
    }

    const { createdBy, plan, payment, status, startDate, endDate, pageSize, pageNo } = req.query

    let filter = {}

    if (createdBy) { filter.createdBy = createdBy }
    if (plan) { filter.plan = plan }
    if (payment) { filter.payment = payment }
    if (status) { filter.status = status }
    if (startDate) { filter.startDate = startDate }
    if (endDate) { filter.endDate = endDate }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const Subscriptions = await Subscription.find(filter)
        .limit(limitValue)
        .skip(skipValue)
    return res.status(200).json({
        success: true,
        message: "Subscriptions fetched successfully",
        Subscriptions
    })
})

module.exports = { getSubscriptions }
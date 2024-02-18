const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const getOrders = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (id) {
        const searchedOrder = await Order.findById({ _id: id })

        if (!searchedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: 'true',
            message: 'Order Fetched successfully',
            Order: searchedOrder
        })
    }

    const { createdBy, payment, pageSize, pageNo } = req.query

    let filter = {}

    if (createdBy) { filter.createdBy = createdBy }
    if (payment) { filter.payment = payment }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedOrders = await Order.find(filter)
        .limit(limitValue)
        .skip(skipValue)

    return res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        Orders: searchedOrders
    })
})

module.exports = { getOrders }
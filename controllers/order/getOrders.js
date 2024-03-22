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
            order: searchedOrder
        })
    }

    const { createdBy, status, payment, pageSize, pageNo } = req.query

    let filter = {}

    if (createdBy && req.user.role != 'user') { filter.createdBy = createdBy }
    else { filter.createdBy = req.user.id }

    if (status) { filter.status = status }
    if (payment) { filter.payment = payment }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedOrders = await Order.find(filter)
        .populate('products.product')
        .sort({ createdAt: -1 })
        .limit(limitValue)
        .skip(skipValue)

    console.log('yourOrders', searchedOrders)
    return res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        orders: searchedOrders
    })
})

module.exports = { getOrders }
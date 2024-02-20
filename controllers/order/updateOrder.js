const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const updateOrder = asyncHandler(async (req, res) => {
    const { status } = req.body

    let searchedOrder = await Order.findById(req.params.id)

    if (!searchedOrder) return res.status(400).json({
        success: false,
        message: 'Order not found'
    })

    if (status) searchedOrder.status = status

    let updatedOrder = await searchedOrder.save()

    console.log(updatedOrder)

    return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        updatedOrder
    })
})

module.exports = { updateOrder }
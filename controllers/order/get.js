const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { createdBy, amount, method, createdBetween, status } = req.query

    const searchedOrders = await Order.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Orders Fetched successfully',
        deleteResponse: searchedOrders
    })
})

module.exports = deleteOrder
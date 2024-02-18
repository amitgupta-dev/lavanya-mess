const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedOrder = await Order.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'order deleted successfully',
        deleteResponse: deletedOrder
    })
})

module.exports = { deleteOrder }
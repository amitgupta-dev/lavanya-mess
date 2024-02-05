const Order = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedOrder = await Order.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Rated successfully',
        deleteResponse: deletedOrder
    })
})

module.exports = deleteOrder
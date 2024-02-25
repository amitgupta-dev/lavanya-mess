const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deleteResponse = await Payment.findByIdAndDelete({ _id: id })

    return res.status(204).json({
        success: 'true',
        message: 'Payment deleted successfully',
        deleteResponse
    })
})

module.exports = { deletePayment }
const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedPayment = await Payment.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Rated successfully',
        deleteResponse: deletedPayment
    })
})

module.exports = deletePayment
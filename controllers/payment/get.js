const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { createdBy, amount, method, createdBetween, status } = req.query

    const searchedPayments = await Payment.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Payments Fetched successfully',
        deleteResponse: searchedPayments
    })
})

module.exports = deletePayment
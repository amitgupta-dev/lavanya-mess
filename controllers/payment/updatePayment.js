const Payment = require('../../models/payment')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updatePayment = asyncHandler(async (req, res) => {
    const { status } = req.body

    let searchedPayment = await Payment.findById(req.params.id)

    if (!searchedPayment) return res.status(404).json({
        success: false,
        message: 'Payment not found'
    })

    if (status) searchedPayment.status = status

    let updatedPayment = await searchedPayment.save()

    console.log(updatedPayment)

    return res.status(200).json({
        success: true,
        message: "Payment updated successfully",
        updatedPayment
    })
})

module.exports = { updatePayment }
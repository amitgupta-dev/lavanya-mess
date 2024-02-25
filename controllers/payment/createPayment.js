const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const createPayment = asyncHandler(async (req, res) => {
    const { amount, method } = req.body

    if (!(amount && method)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newPayment = new Payment({
        createdBy: req.user.id,
        amount,
        method
    })

    const createdPayment = await newPayment.save()
    return res.status(201).json({
        success: 'true',
        message: 'Payment successful',
        PaymentDetails: createdPayment
    })
})

module.exports = { createPayment }
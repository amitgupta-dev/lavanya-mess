const Payment = require('../../models/Payment')
const asyncHandler = require('../../utils/asyncHandler')

const createPayment = asyncHandler(async (req, res) => {
    const { amount, method } = req.body

    const newPayment = new Payment({
        amount,
        method,
        createdBy: req.user.id
    })

    const createdPayment = await newPayment.save()
    return res.status(200).json({
        success: 'true',
        message: 'Payment successful',
        PaymentDetails: createdPayment
    })
})
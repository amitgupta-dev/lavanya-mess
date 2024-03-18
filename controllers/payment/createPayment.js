const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const createPayment = asyncHandler(async (req, res) => {
    const { amount, method, txnId, txnRef, approvalRef, status } = req.body

    if (!(amount && method)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newPayment = new Payment({
        createdBy: req.user.id,
        status,
        amount,
        method,
        txnId,
        txnRef,
        approvalRef,
    })

    const createdPayment = await newPayment.save()
    return res.status(201).json({
        success: status === 'failed' ? 'false' : 'true',
        message: `Payment ${status}`,
        paymentDetails: createdPayment
    })
})

module.exports = { createPayment }
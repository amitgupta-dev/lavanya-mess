const Payment = require('../../models/payment')
const asyncHandler = require('../../utils/asyncHandler')

const getPayments = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (id) {
        const searchedPayment = await Payment.findById({ _id: id })

        if (!searchedPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            })
        }

        return res.status(200).json({
            success: 'true',
            message: 'Payment Fetched successfully',
            payment: searchedPayment
        })
    }

    const { createdBy, entity, amountLessThan, amountMoreThan, method, pageSize, pageNo } = req.query

    let filter = {}

    if (createdBy) { filter.createdBy = createdBy }
    if (entity) { filter.entity = entity }
    if (amountLessThan) { filter.amount = { $lte: amountLessThan } }
    if (amountMoreThan) { filter.amount = { $gte: amountMoreThan } }
    if (method) { filter.method = method }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedPayments = await Payment.find(filter)
        .limit(limitValue)
        .skip(skipValue)
    return res.status(200).json({
        success: true,
        message: "Payments fetched successfully",
        Payments: searchedPayments
    })
})

module.exports = { getPayments }
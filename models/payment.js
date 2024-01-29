const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'wallet']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Number,
        required: true
    }
})

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
module.exports = Payment
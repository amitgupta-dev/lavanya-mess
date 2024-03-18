const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
        required: true,
        default: 'pending'
    },
    txnId: {
        type: String,
    },
    txnRef: {
        type: String,
    },
    approvalRef: {
        type: String,
    },
}, {
    timestamps: true,
})

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
module.exports = Payment
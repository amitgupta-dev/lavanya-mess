const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: String,
        enum: ['OneTimer', 'Simple', 'Premium', 'Gold', 'Platinum'],
        required: true
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
        enum: ['active', 'expired'],
        required: true
    },
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: true,
    },
    location: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
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
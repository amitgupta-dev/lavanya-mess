const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
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
    methodOfPayment: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'wallet']
    },
    status: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active',
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

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema)
module.exports = Subscription
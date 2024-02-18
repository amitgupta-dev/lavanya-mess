const mongoose = require('mongoose');
const { LocationSchema } = require('./user');

const SubscriptionSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
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
    destination: LocationSchema
}, {
    timestamps: true,
})

SubscriptionSchema.index({ location: '2dsphere' });

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema)
module.exports = Subscription
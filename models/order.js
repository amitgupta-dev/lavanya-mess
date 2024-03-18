const mongoose = require('mongoose')
const { LocationSchema } = require('./user')

const OrderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled', 'payment failed'],
        default: 'pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    destination: LocationSchema,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
module.exports = Order
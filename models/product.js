const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    rating: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        avg: {
            type: Number
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = Product
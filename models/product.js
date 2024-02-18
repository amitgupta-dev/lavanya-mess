const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    category: String,
    tags: [String],
    rating: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        avg: {
            type: Number
        }
    }
}, {
    timestamps: true,
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = Product
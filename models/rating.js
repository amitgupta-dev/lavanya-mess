const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema)
module.exports = Rating
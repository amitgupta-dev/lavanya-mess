const mongoose = require('mongoose')

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    banner: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    timesADay: {
        type: Number,
        required: true
    },
    meals: [{
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
}, {
    timestamps: true
})

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema)

module.exports = Plan
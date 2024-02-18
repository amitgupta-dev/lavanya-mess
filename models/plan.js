const mongoose = require('mongoose')

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
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
    menu: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        breakfast: {
            type: String
        },
        lunch: {
            type: String
        },
        dinner: {
            type: String
        }
    }]
}, {
    timestamps: true
})

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema)

module.exports = Plan
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    avatar: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    dob: Number,
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    password: {
        type: String,
        required: true,
    },
    address: [String],
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    role: {
        type: Strnig,
        enum: ['admin', 'manager', 'staff', 'user']
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Number,
    verifyToken: String,
    verifyTokenExpiry: Number,
}, {
    timestamps: true,
})

UserSchema.index({ location: '2dsphere' });

const User = mongoose.models.User || mongoose.model("User", UserSchema)

module.exports = User
const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
    isDefault: {
        type: Boolean,
        default: false
    },
    receiver: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
    },
    address: String,
    landmark: String,
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})



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
    locations: [LocationSchema],
    role: {
        type: String,
        enum: ['admin', 'manager', 'staff', 'user'],
        default: 'user'
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

UserSchema.index({ location: '2dsphere' })

const User = mongoose.models.User || mongoose.model("User", UserSchema)

module.exports = User

module.exports.LocationSchema = LocationSchema


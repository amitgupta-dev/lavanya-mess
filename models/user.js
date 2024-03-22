const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
    isDefault: {
        type: Boolean,
        default: false
    },
    receiver: {
        name: {
            type: String
        },
        phone: {
            type: Number,
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
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    phone: {
        type: Number,
        unique: true,
    },
    dob: Date,
    gender: {
        type: String,
        required: [true, 'gender is required'],
        enum: {
            values: ["Male", "Female", "Others"],
            message: "please choose a gender among 'Male', 'Female' or 'Others'"
        },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    locations: [LocationSchema],
    role: {
        type: String,
        enum: {
            values: ['admin', 'manager', 'staff', 'user'],
            message: "please choose a gender among 'admin', 'manager', 'staff' or 'user'"
        },
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


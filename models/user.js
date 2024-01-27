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
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    acceptTAndC: {
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
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

module.exports = User
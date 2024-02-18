const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['read', 'unread']
    },

}, {
    timestamps: true,
})

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema)
module.exports = Notification
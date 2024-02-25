const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const verifyEmailOtp = asyncHandler(async (req, res) => {
    const { email, code } = req.body

    let searchedUser = await User.findOne({ email })

    if (!searchedUser) return res.status(404).json({
        success: false,
        message: 'User not found'
    })

    // const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })

    if (searchedUser.forgotPasswordTokenExpiry > Date.now() && searchedUser.forgotPasswordToken == code) {

        const payload = { id: searchedUser._id }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 600 })

        res.cookie("passwordChangeToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            domain: 'localhost',
            path: '/',
            expires: new Date(Date.now() + 10 * 60 * 1000)
        })
        return res.status(201).json({
            success: true,
            message: "you can now change your password",
        })
    }

    return res.status(400).json({
        success: false,
        message: "otp expired",
    })
})

module.exports = { verifyEmailOtp }
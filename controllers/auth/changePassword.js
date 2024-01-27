const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const changePassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body

    const { passwordChangeToken } = req.cookies

    if (!passwordChangeToken) {
        return res.json({ success: false, message: "Token not found" }).status(401)
    }

    jwt.verify(passwordChangeToken, process.env.TOKEN_SECRET, async (error, decoded) => {
        if (error) return res.json({
            success: false,
            message: error.message || "Invalid token"
        }).status(401)

        try {
            let searchedUser = await User.findById({ _id: decoded.id })

            if (!searchedUser) return res.status(404).json({
                success: false,
                message: 'User not found'
            })

            if (newPassword) {
                const salt = await bcryptjs.genSalt(10)
                const hashedPassword = await bcryptjs.hash(newPassword, salt)
                searchedUser.password = hashedPassword
            }

            searchedUser.forgotPasswordToken = undefined
            searchedUser.forgotPasswordTokenExpiry = undefined
            searchedUser.verifyToken = undefined
            searchedUser.verifyTokenExpiry = undefined

            let updatedUser = await searchedUser.save()

            updatedUser.password = undefined

            res.cookie("passwordChangeToken", "", { httpOnly: true, maxAge: 0 })
            return res.status(200).json({
                success: true,
                message: "password changed successfully",
                user: updatedUser
            })
        }
        catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: err.message || "something went wrong"
            })
        }

    })
})

module.exports = { changePassword }
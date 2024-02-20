const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //if user exists
    const searchedUser = await User.findOne({ email })

    if (!searchedUser) {
        return res.json({
            success: false,
            message: "user not found"
        })
    }

    //if password is correct
    const isRightPassword = await bcryptjs.compare(password, searchedUser.password)

    if (!isRightPassword) {
        return res.json({
            success: false,
            message: "Invalid password"
        })
    }

    const payload = {
        id: searchedUser._id,
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })

    searchedUser.password = undefined

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        domain: 'localhost',
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res.json({
        success: true,
        message: "Login successful",
        user: { ...searchedUser, token }
    })
})

module.exports = { login }
const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    if (!(email && password)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    //if user exists
    const searchedUser = await User.findOne({ email })

    if (!searchedUser) {
        return res.status(404).json({
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

    const payload = searchedUser._doc ? {
        id: searchedUser._doc._id,
        ...searchedUser._doc,
        _id: undefined
    } : {
        id: searchedUser._id,
        ...searchedUser,
        _id: undefined
    }
    delete (payload._id)

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })

    delete (payload.password)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        domain: 'localhost',
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res.status(201).json({
        success: true,
        message: "Login successful",
        user: { ...payload, token }
    })
})

module.exports = { login }
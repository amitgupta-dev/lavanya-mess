const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const signup = asyncHandler(async (req, res) => {
    let { name, role, email, phone, password, dob, gender, locations } = req.body

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        avatar: `${gender === "Male" ? "https://res.cloudinary.com/dfokdktd4/image/upload/v1703744555/Avatars%20And%20Covers/static%20images/zedpbedekdq0meglqacy.jpg" : "https://res.cloudinary.com/dfokdktd4/image/upload/v1703744590/Avatars%20And%20Covers/static%20images/kp96wd8jxe2uc1m4t6jf.jpg"}`,
        name,
        email,
        phone,
        password: hashedPassword,
        gender,
        role,
        locations,
        isAdmin: true
    })
    if (dob) {
        newUser.dob = dob
    }

    let createdUser = await newUser.save()

    const payload = createdUser._doc ? {
        id: createdUser._doc._id,
        ...createdUser._doc,
    } : {
        id: createdUser._id,
        ...createdUser,
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
        message: "User created successfully",
        user: { ...payload, token: token }
    })
})

module.exports = { signup }
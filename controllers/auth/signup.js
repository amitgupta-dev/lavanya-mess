const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const signup = asyncHandler(async (req, res) => {
    let { name, role, email, phone, password, dob, gender, acceptTAndC } = req.body

    dob = new Date(dob).getTime()

    // check if user exists
    const user = await User.findOne({ email })

    if (user) {
        return res.json({
            success: false,
            message: "user already exists"
        })
    }

    console.log("hello")
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        avatar: `${gender === "Male" ? "https://res.cloudinary.com/dfokdktd4/image/upload/v1703744555/Avatars%20And%20Covers/static%20images/zedpbedekdq0meglqacy.jpg" : "https://res.cloudinary.com/dfokdktd4/image/upload/v1703744590/Avatars%20And%20Covers/static%20images/kp96wd8jxe2uc1m4t6jf.jpg"}`,
        name,
        email,
        phone,
        password: hashedPassword,
        dob,
        gender,
        role,
        acceptTAndC,
        isAdmin: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    let createdUser = await newUser.save()

    createdUser.password = undefined

    console.log(createdUser)

    const payload = {
        id: createdUser._id,
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })

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
        message: "User created successfully",
        user: createdUser
    })
})

module.exports = { signup }
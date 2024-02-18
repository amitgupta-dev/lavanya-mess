const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updateUser = asyncHandler(async (req, res) => {
    const {
        avatar,
        name,
        email,
        phone,
        gender,
        password,
        locations } = req.body

    let searchedUser = await User.findById(req.user.id)

    if (!searchedUser) return res.status(404).json({
        success: false,
        message: 'User not found'
    })

    if (avatar) searchedUser.avatar = avatar
    if (name) searchedUser.name = name
    if (email) searchedUser.email = email
    if (phone) searchedUser.phone = phone
    if (gender) searchedUser.gender = gender

    if (password) {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        searchedUser.password = hashedPassword
    }
    if (locations) searchedUser.locations = locations

    let updatedUser = await searchedUser.save()

    updatedUser.password = undefined

    console.log(updatedUser)

    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser
    })
})

module.exports = { updateUser }
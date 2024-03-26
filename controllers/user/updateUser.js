const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')
const cloudinary = require('../../configs/cloudinary')

const updateUser = asyncHandler(async (req, res) => {
    const {
        avatar,
        name,
        email,
        phone,
        gender,
        dob,
        password,
        locations } = req.body


    let searchedUser = await User.findById(req.user.id)

    if (!searchedUser) return res.status(404).json({
        success: false,
        message: 'User not found'
    })

    if (avatar) {

        const parts = searchedUser.avatar.split('/');

        const public_id = parts
            .slice(parts.indexOf('upload') + 2, parts.length)
            .join('/')
            .split('.')[0]

        console.log('public_id: ', public_id)
        if (!public_id.includes('rci8vyzrxdrh6mnjnrsk') &&
            !public_id.includes('ml2mskhzrkki03s4th6m')) {

            cloudinary.uploader.destroy(public_id).then((response) => {
                console.log(response)
            })
        }
        searchedUser.avatar = avatar
    }
    if (name) searchedUser.name = name
    if (email) searchedUser.email = email
    if (phone) searchedUser.phone = Number(phone)
    if (gender) searchedUser.gender = gender
    if (dob) searchedUser.dob = dob

    if (password) {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        searchedUser.password = hashedPassword
    }

    if (locations) {
        if (searchedUser.locations && !searchedUser.locations.some(location => location.isDefault === true)) {
            locations[0].isDefault = true
        }
        searchedUser.locations = locations
    }

    let updatedUser = await searchedUser.save()

    updatedUser.password = undefined



    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser
    })
})

module.exports = { updateUser }
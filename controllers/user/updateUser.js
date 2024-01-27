const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updateUser = asyncHandler(async (req, res) => {
    const {
        avatar,
        cover,
        name,
        email,
        about,
        phone,
        gender,
        work,
        education,
        placesLived,
        relationship,
        familyType,
        nickname,
        quote,
        password } = req.body

    let searchedUser = await User.findById(req.user.id)

    if (!searchedUser) return res.status(404).json({
        success: false,
        message: 'User not found'
    })

    if (avatar) searchedUser.avatar = avatar
    if (cover) searchedUser.cover = cover
    if (name) searchedUser.name = name
    if (email) searchedUser.email = email
    if (about) searchedUser.about = about
    if (phone) searchedUser.phone = phone
    if (gender) searchedUser.gender = gender
    if (work) {
        work.forEach(item => {
            item.from = new Date(item.from).getTime()
            item.to = new Date(item.to).getTime()
        })
        searchedUser.work = work
    }
    if (education) {
        education.forEach(item => {
            item.from = new Date(item.from).getTime()
            item.to = new Date(item.to).getTime()
        })
        searchedUser.education = education
    }
    if (placesLived) {
        placesLived.forEach(item => {
            item.from = new Date(item.from).getTime()
            item.to = new Date(item.to).getTime()
        })
        searchedUser.placesLived = placesLived
    }
    if (relationship) searchedUser.relationship = relationship
    if (familyType) searchedUser.familyType = familyType
    if (nickname) searchedUser.nickname = nickname
    if (quote) searchedUser.quote = quote

    if (password) {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        searchedUser.password = hashedPassword
    }

    searchedUser.updatedAt = Date.now()


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
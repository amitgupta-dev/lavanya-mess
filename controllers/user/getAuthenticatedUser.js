const User = require('../../models/user')
const asyncHandler = require('../../utils/asyncHandler')

const getAuthenticatedUser = asyncHandler(async (req, res) => {
    let { id } = req.user
    console.log(id)

    // check if user exists
    const searchedUser = await User.findById({ _id: id })

    if (!searchedUser) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    console.log(searchedUser)

    searchedUser.password = undefined

    return res.status(201).json({
        success: true,
        message: "User fetched successfully",
        user: searchedUser
    })
})

module.exports = { getAuthenticatedUser }
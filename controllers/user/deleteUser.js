const User = require('../../models/user')
const asyncHandler = require('../../utils/asyncHandler')

const deleteUser = asyncHandler(async (req, res) => {
    const deleteResponse = await User.deleteOne({ _id: req.user.id })
    res.cookie("token", "", { httpOnly: true, maxAge: 0 })
    return res.json({
        success: true,
        message: "User deleted successfully",
        deleteResponse
    }).status(204)
})

module.exports = { deleteUser }
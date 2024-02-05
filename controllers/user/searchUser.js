const User = require('../../models/user')
const asyncHandler = require('../../utils/asyncHandler')

const searchUsers = asyncHandler(async (req, res) => {
    const { name, gender, role, locationBetween, pageSize, pageNo } = req.query

    console.log(req.query)

    let filter = {}

    if (name) {
        filter = {
            name: {
                $regex: new RegExp(`\\b${name}\\b`, 'i')
            }
        }
    }
    if (gender) { filter.gender = gender }
    if (role) { filter.role = role }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const Users = await User.find(filter)
        .limit(limitValue)
        .skip(skipValue)
    return res.json({
        success: true,
        message: "Users fetched successfully",
        Users
    }).status(200)
})

module.exports = { searchUsers }
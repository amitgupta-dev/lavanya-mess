const User = require('../../models/user')
const asyncHandler = require('../../utils/asyncHandler')

const searchUsers = asyncHandler(async (req, res) => {
    const { name, gender, location, education, company, pageSize, pageNo } = req.query

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
    if (location) {
        filter.placesLived = {
            $elemMatch: {
                'location': { $regex: new RegExp(`\\b${location}\\b`, 'i') },
            },
        }
    }
    if (education) {
        filter.education = {
            $elemMatch: {
                'organization': { $regex: new RegExp(`\\b${education}\\b`, 'i') },
            },
        }
    }
    if (company) {
        filter.work = {
            $elemMatch: {
                'organization': { $regex: new RegExp(`\\b${company}\\b`, 'i') },
            },
        }
    }

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
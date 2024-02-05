const Rating = require('../../models/rating')
const asyncHandler = require('../../utils/asyncHandler')

const deleteRating = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { product, createdBy, createdBetween, ratingBetween } = req.query

    const searchedRatings = await Rating.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Ratings Fetched successfully',
        deleteResponse: searchedRatings
    })
})

module.exports = deleteRating
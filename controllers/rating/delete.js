const Rating = require('../../models/rating')
const asyncHandler = require('../../utils/asyncHandler')

const deleteRating = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedRating = await Rating.findByIdAndDelete({ _id: id })

    return res.status(204).json({
        success: 'true',
        message: 'Rated successfully',
        deleteResponse: deletedRating
    })
})

module.exports = deleteRating
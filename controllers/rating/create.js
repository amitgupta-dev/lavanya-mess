const Rating = require('../../models/Rating')
const asyncHandler = require('../../utils/asyncHandler')

const createRating = asyncHandler(async (req, res) => {
    const { rating, Rating } = req.body

    const newRating = new Rating({
        rating,
        createdBy: req.user.id,
        product
    })

    const createdRating = await newRating.save()
    return res.status(201).json({
        success: 'true',
        message: 'Rating successful',
        RatingDetails: createdRating
    })
})
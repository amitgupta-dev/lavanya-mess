const Product = require('../../models/product')
const asyncHandler = require('../../utils/asyncHandler')

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { name, category, tags, ratingBetween, priceBetween, createdBy, createdBetween } = req.query

    const searchedProducts = await Product.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Products Fetched successfully',
        deleteResponse: searchedProducts
    })
})

module.exports = deleteProduct
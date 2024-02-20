const Product = require('../../models/product')
const asyncHandler = require('../../utils/asyncHandler')

const getProducts = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (id) {
        const searchedProduct = await Product.findById({ _id: id })

        return res.status(200).json({
            success: 'true',
            message: 'Product Fetched successfully',
            product: searchedProduct
        })
    }
    const { name, type, category, tags, ratingLessThan, ratingMoreThan, priceLessThan, priceMoreThan, pageSize, pageNo } = req.query
    let filter = {}
    if (name) {
        filter.name = { $regex: new RegExp(name, 'i') }
    }
    if (type) {
        filter.type = type
    }
    if (category) {
        filter.category = { $in: category }
    }
    if (tags) {
        filter.tags = { $in: tags }
    }
    if (ratingLessThan) {
        filter.rating = { $lte: ratingLessThan }
    }
    if (ratingMoreThan) {
        filter.rating = { $gte: ratingMoreThan }
    }
    if (priceLessThan) {
        filter.price = { $lte: priceLessThan }
    }
    if (priceMoreThan) {
        filter.price = { $gte: priceMoreThan }
    }

    console.log(filter)

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedProducts = await Product.find(filter)
        .limit(limitValue)
        .skip(skipValue)
    return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products: searchedProducts
    })
})

module.exports = { getProducts }
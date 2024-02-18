const Product = require('../../models/product')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        thumbnail,
        description,
        price,
        type,
        category,
        tags } = req.body
    console.log(tags)
    let searchedProduct = await Product.findById(req.params.id)

    if (!searchedProduct) return res.status(404).json({
        success: false,
        message: 'Product not found'
    })

    if (name) {
        searchedProduct.name = name
        searchedProduct.tags = [...name.split(" ")]
    }
    if (thumbnail) searchedProduct.thumbnail = thumbnail
    if (description) searchedProduct.description = description
    if (price) searchedProduct.price = price
    if (type) searchedProduct.type = type
    if (category) searchedProduct.category = category
    if (tags) searchedProduct.tags = [...searchedProduct.tags, ...tags]

    let updatedProduct = await searchedProduct.save()

    console.log(updatedProduct)

    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        Product: updatedProduct
    })
})

module.exports = { updateProduct }
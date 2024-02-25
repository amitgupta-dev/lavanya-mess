const Product = require('../../models/product')
const asyncHandler = require('../../utils/asyncHandler')

const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        thumbnail,
        description,
        price,
        type,
        category,
        tags
    } = req.body

    if (!(name && description && price && category)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newProduct = new Product({
        name,
        thumbnail,
        description,
        price,
        type,
        category,
        tags: [...name.split(' '), ...tags],
        createdBy: req.user.id
    })

    const createdProduct = await newProduct.save()
    return res.status(201).json({
        success: 'true',
        message: 'Product Created successfully',
        ProductDetails: createdProduct
    })
})

module.exports = { createProduct }
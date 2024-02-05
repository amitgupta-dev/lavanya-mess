const Product = require('../../models/product')
const asyncHandler = require('../../utils/asyncHandler')

const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        thumbnail,
        images,
        description,
        price,
        category,
        tags,
        rating
    } = req.body

    const newProduct = new Product({
        name,
        thumbnail,
        images,
        description,
        price,
        category,
        tags,
        rating,
        createdBy: req.user.id
    })

    const createdProduct = await newProduct.save()
    return res.status(200).json({
        success: 'true',
        message: 'Product successful',
        ProductDetails: createdProduct
    })
})
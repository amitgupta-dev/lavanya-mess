const Product = require('../../models/product')
const asyncHandler = require('../../utils/asyncHandler')

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedProduct = await Product.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Product Deleted successfully',
        deleteResponse: deletedProduct
    })
})

module.exports = { deleteProduct }
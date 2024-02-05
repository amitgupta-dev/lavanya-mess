const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const createOrder = asyncHandler(async (req, res) => {
    const { products, totalPrice, payment, location } = req.body

    const newOrder = new Order({
        products,
        totalPrice,
        payment,
        location,
        createdBy: req.user.id
    })

    const createdOrder = await newOrder.save()
    return res.status(200).json({
        success: 'true',
        message: 'order successful',
        orderDetails: createdOrder
    })
})
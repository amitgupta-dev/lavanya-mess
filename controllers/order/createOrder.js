const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const createOrder = asyncHandler(async (req, res) => {
    const { products, totalPrice, payment, destination } = req.body

    if (!(products && totalPrice && payment && destination)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newOrder = new Order({
        createdBy: req.user.id,
        products,
        totalPrice,
        payment,
        destination
    })

    const createdOrder = await newOrder.save()
    return res.status(200).json({
        success: 'true',
        message: 'order successful',
        orderDetails: createdOrder
    })
})

module.exports = { createOrder }
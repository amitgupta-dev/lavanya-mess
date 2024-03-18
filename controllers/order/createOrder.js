const Order = require('../../models/order')
const asyncHandler = require('../../utils/asyncHandler')

const createOrder = asyncHandler(async (req, res) => {
    const { status, products, totalPrice, payment, destination } = req.body

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

    if (status) { newOrder.status = status }

    const createdOrder = await newOrder.save()
    return res.status(201).json({
        success: status === 'placed' ? 'true' : 'false',
        message: `order ${status}`,
        orderDetails: createdOrder
    })
})

module.exports = { createOrder }
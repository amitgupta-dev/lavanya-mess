const Menu = require('../../models/menu')
const asyncHandler = require('../../utils/asyncHandler')

const createMenu = asyncHandler(async (req, res) => {
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body

    if (!(Monday && Tuesday && Wednesday && Thursday && Friday && Saturday && Sunday)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newMenu = new Menu({
        Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
    })

    const createdMenu = await newMenu.save()
    return res.status(201).json({
        success: 'true',
        message: 'Menu created successfully',
        menu: createdMenu
    })
})

module.exports = { createMenu }
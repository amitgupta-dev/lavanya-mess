const Menu = require('../../models/menu')
const asyncHandler = require('../../utils/asyncHandler')

const updateMenu = asyncHandler(async (req, res) => {
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body

    let searchedMenu = await Menu.findById(req.params.id)

    if (!searchedMenu) return res.status(400).json({
        success: false,
        message: 'Menu not found'
    })

    if (Monday) searchedMenu.Monday = Monday
    if (Tuesday) searchedMenu.Tuesday = Tuesday
    if (Wednesday) searchedMenu.Wednesday = Wednesday
    if (Thursday) searchedMenu.Thursday = Thursday
    if (Friday) searchedMenu.Friday = Friday
    if (Saturday) searchedMenu.Saturday = Saturday
    if (Sunday) searchedMenu.Sunday = Sunday

    let updatedMenu = await searchedMenu.save()

    console.log(updatedMenu)

    return res.status(200).json({
        success: true,
        message: "Menu updated successfully",
        updatedMenu
    })
})

module.exports = { updateMenu }
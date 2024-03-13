const Menu = require('../../models/menu')
const asyncHandler = require('../../utils/asyncHandler')

const getMenus = asyncHandler(async (req, res) => {
    const { id } = req.params

    console.log(req.params)

    if (id) {
        const searchedMenu = await Menu.findById({ _id: id })

        if (!searchedMenu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found"
            })
        }

        return res.status(200).json({
            success: 'true',
            message: 'Menu Fetched successfully',
            menu: searchedMenu
        })
    }

    const limitValue = 30
    // Number(pageSize) || 30
    const pageNumber = 0
    // Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedMenus = await Menu.find()
        .limit(limitValue)
        .skip(skipValue)

    return res.status(200).json({
        success: true,
        message: "All Menus fetched successfully",
        menus: searchedMenus
    })
})

module.exports = { getMenus }
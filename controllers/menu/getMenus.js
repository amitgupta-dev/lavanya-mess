const Menu = require('../../models/menu')
const asyncHandler = require('../../utils/asyncHandler')

const getMenus = asyncHandler(async (req, res) => {
    const { id } = req.params

    console.log(req.params)

    const fields = 'Monday.breakfast Monday.lunch Monday.dinner Tuesday.breakfast Tuesday.lunch Tuesday.dinner Wednesday.breakfast Wednesday.lunch Wednesday.dinner Thursday.breakfast Thursday.lunch Thursday.dinner Friday.breakfast Friday.lunch Friday.dinner Saturday.breakfast Saturday.lunch Saturday.dinner Sunday.breakfast Sunday.lunch Sunday.dinner'

    if (id) {
        const searchedMenu = await Menu.findById({ _id: id })
            .populate(fields)

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
        .populate(fields)
        .limit(limitValue)
        .skip(skipValue)

    return res.status(200).json({
        success: true,
        message: "All Menus fetched successfully",
        menus: searchedMenus
    })
})

module.exports = { getMenus }
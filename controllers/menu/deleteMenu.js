const Menu = require('../../models/menu')
const asyncHandler = require('../../utils/asyncHandler')

const deleteMenu = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedMenu = await Menu.findByIdAndDelete({ _id: id })

    return res.status(204).json({
        success: 'true',
        message: 'Menu deleted successfully',
        deleteResponse: deletedMenu
    })
})

module.exports = { deleteMenu }
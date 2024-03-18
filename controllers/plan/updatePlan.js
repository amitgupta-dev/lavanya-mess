const Plan = require('../../models/plan')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('../../utils/asyncHandler')

const updatePlan = asyncHandler(async (req, res) => {
    const { name, thumbnail, price, meals, menu } = req.body

    let searchedPlan = await Plan.findById(req.params.id)

    if (!searchedPlan) return res.status(404).json({
        success: false,
        message: 'Plan not found'
    })

    if (name) searchedPlan.name = name
    if (thumbnail) searchedPlan.thumbnail = thumbnail
    if (banner) searchedPlan.banner = banner
    if (price) searchedPlan.price = price
    if (meals) {
        searchedPlan.meals = meals
        searchedPlan.timesADay = meals.length
    }
    if (menu) searchedPlan.menu = menu

    let updatedPlan = await searchedPlan.save()

    console.log(updatedPlan)

    return res.status(200).json({
        success: true,
        message: "Plan updated successfully",
        updatedPlan
    })
})

module.exports = { updatePlan }
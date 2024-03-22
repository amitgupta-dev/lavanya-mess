const Plan = require('../../models/plan')
const asyncHandler = require('../../utils/asyncHandler')

const getPlans = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (id) {
        const searchedPlan = await Plan.findById({ _id: id })

        return res.status(200).json({
            success: 'true',
            message: 'Plan Fetched successfully',
            plan: searchedPlan
        })
    }
    const { name, priceLessThan, priceMoreThan, pageSize, pageNo } = req.query
    let filter = {}
    if (name) {
        filter.name = { $regex: new RegExp(name, 'i') }
    }

    const limitValue = Number(pageSize) || 30
    const pageNumber = Number(pageNo || "0")
    const skipValue = pageNumber === 0 ? 0 : limitValue * (pageNumber - 1)

    const searchedPlans = await Plan.find(filter)
        .limit(limitValue)
        .skip(skipValue)
    return res.status(200).json({
        success: true,
        message: "Plans fetched successfully",
        plans: searchedPlans
    })
})

module.exports = { getPlans }
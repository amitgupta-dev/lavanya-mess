const Plan = require('../../models/plan')
const asyncHandler = require('../../utils/asyncHandler')

const deletePlan = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedPlan = await Plan.findByIdAndDelete({ _id: id })

    return res.status(204).json({
        success: 'true',
        message: 'Plan Deleted successfully',
        deleteResponse: deletedPlan
    })
})

module.exports = { deletePlan }
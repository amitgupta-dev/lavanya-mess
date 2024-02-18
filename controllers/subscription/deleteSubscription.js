const Subscription = require('../../models/subscription')
const asyncHandler = require('../../utils/asyncHandler')

const deleteSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedSubscription = await Subscription.findByIdAndDelete({ _id: id })

    return res.status(200).json({
        success: 'true',
        message: 'Rated successfully',
        deleteResponse: deletedSubscription
    })
})

module.exports = { deleteSubscription }
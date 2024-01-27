const asyncHandler = (controller) => {
    return (req, res, next) => {
        try {
            controller(req, res, next)
        }
        catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: err.message || "something went wrong"
            })
        }
    }
}

module.exports = asyncHandler
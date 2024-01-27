const asyncHandler = require("../../utils/asyncHandler")

const logout = asyncHandler((req, res) => {
    res.cookie("token", "", { httpOnly: true, maxAge: 0 })
    return res.json({
        success: true,
        message: "logout successful"
    })
})

module.exports = { logout }
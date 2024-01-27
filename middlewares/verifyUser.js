const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({ success: false, message: "Token not found" }).status(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) return res.json({ success: false, message: error.message || "Invalid token" }).status(401)
        req.user = decoded
        next()
    })
}

module.exports = { verifyUser }
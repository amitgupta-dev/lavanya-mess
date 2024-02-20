const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    let { token } = req.cookies
    if (!token) {
        const authHeader = req.headers['authorization'];

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = await authHeader.substring('Bearer '.length)c
        } else {
            return res.status(401).json({ success: false, message: "Token not found" });
        }
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ success: false, message: error.message || "Invalid token" });
        }
        req.user = decoded;
        console.log(decoded)
        next();
    });
};

module.exports = { verifyUser };

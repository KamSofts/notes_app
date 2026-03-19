const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
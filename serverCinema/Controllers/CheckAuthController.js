const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

const authenticateToken = (req, res, next) =>
{
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, SECRET_KEY, (err, data) =>
    {
        if (err) {
            return res.status(500).send("Failed to authenticate token");
        } else {
            req.user = data; // Attach user information to the request object
            next(); // Move to the next middleware or route handler
        }
    });
};

module.exports = authenticateToken;

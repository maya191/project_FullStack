const express = require("express");
const authService = require("../Services/AuthService");
const router = express.Router();

// Entry Point: http://localhost:4000/login

router.post("/", async (req, res) =>
{
    const { userName, password } = req.body;
    const token = await authService.findUserInSystem(userName, password);
    if (token) {
        res.send({ accessToken: token, userName: userName });
    } else {
        res.status(401).send("user not found");
    }
});

module.exports = router;

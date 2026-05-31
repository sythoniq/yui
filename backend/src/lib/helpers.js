require("dotenv").config()
const jwt = require("jsonwebtoken")

function signJwt(userId) {
    const payload = {
        sub: userId,
        iat: Date.now()
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d"});

    return "Bearer " + token;
}

module.exports = {
    signJwt
}
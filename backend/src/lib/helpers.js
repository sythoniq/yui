require("dotenv").config()
const jwt = require("jsonwebtoken")

async function signJwt(userId) {
    const payload = {
        userId
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d"});

    return token;
}

module.exports = {
    signJwt
}
require("dotenv").config()

const prisma = require("./prisma.js")
const jwt = require('jsonwebtoken')

async function authorizeUser(req, res, next) {
    try {
        const fullToken = req['headers'].authorization;
        if (!fullToken) {
            throw new Error("Token not provided")
        }

        const token = fullToken.split(" ")[1]

        const result = jwt.verify(token, process.env.SECRET);
        if (result) {
            const user = await prisma.user.findUnique({
                where: {
                    userId: result.sub
                }
            })

            if (user) {
                req.user = { userId: user.userId, userName: user.userName};
                next()
            } else {
                throw new Error("User not authorized")
            }
        } else {
            throw new Error("Authorization failed")
        }
    } catch (e) {
        return res.json({ success: false, message: "There was an error, go complain to express error stuff", error: e });
    }
}

module.exports = {
    authorizeUser,
}
require("dotenv").config()

const prisma = require("./prisma.js")
const jwt = require('jsonwebtoken')

async function authorizeUser(req, res, next) {
    const fullToken = req['headers'].authorization;
    if (!fullToken) {
        return next()
    }

    const token = fullToken.split(" ")[1]
    try {
        const result = jwt.verify(token, process.env.SECRET);
        if (result) {
            const user = await prisma.user.findUnique({
                where: {
                    userId: result.sub
                }
            })

            if (user) {
                next()
            } else {
                throw new Error("User not authorized")
            }
        } else {
            throw new Error("Authorization failed")
        }
    } catch(e) {
        return res.json({success: false, error: e});
    }
}

module.exports = {
    authorizeUser,
}
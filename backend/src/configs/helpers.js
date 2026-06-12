const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {
				if (!req.headers["authorization"]) next()

				const token = req.headers["authorization"].split(" ")[1];
				const result = jwt.verify(token, process.env.SECRET);

				try {
								const user = await prisma.user.findUnique({
												where: {
																userId: result.sub
												}
								})

								if (!user) {
												throw new Error("User not found!")
								}
								next()
				} catch(e) {
								next(e);
				}

				//TODO: Once i confirm what jwt verify returns then implement the authUser function fully.
}

function signJwt(userId) {
				if (!userId) return "No user id provided"
				const payload = {
								sub: userId,
								iat: Date.now()
				}

				const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });

				return token;
}

module.exports = {
				signJwt,
				authUser
}

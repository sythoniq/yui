const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {
				if (!req.headers["authorization"]) next()

				const token = req.headers["authorization"].split(" ")[1]; // Split from bearer
				const result = jwt.verify(token, process.env.SECRET);

				try {
								const user = await prisma.user.findUnique({
												where: {
																user_id: result.sub
												}
								})

								if (!user) {
												throw new Error("User not found!")
								}
								req.user = { userName: user.user_name, userId: user.user_id};
								next();
				} catch(e) {
								next(e);
				}
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

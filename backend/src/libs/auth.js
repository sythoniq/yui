const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

module.exports = (async (req, res, next) => {
				try {
								const authHeader = req.headers["authorization"];
								const token = authHeader.split(" ")[1]

								if (!token) {
												req.user = null;
												return next()
								}

								const result = jwt.decode(token, process.env.JWT_SECRET);
								req.user = result;

								return next()
				} catch (e) {
								req.user = null;
								return next()
				}
})

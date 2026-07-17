const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

module.exports = (async (req, res, next) => {
				try {
								const token = req.headers["authorization"].split(" ")[1];

								if (!token) {
												req.user = null;
												return next()
								}
								jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
												if (error) {
																req.user = null;
																return next()
												}

												req.user = decoded
												return next()
								})
				} catch (e) {
								req.user = null;
								return next()
				}
})

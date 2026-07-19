const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

module.exports = ((req, res, next) => {
	try {
		if (!req.headers["authorization"]) {
			throw new Error("Authorization header missing")
		}
		const token = req.headers["authorization"].split(" ")[1];

		if (!token) {
			req.user = null;
			return next()
		}

		const result = jwt.verify(token, process.env.JWT_SECRET);
		if (!result) {
			throw new Error("Verification failed")
		}
		req.user = result
		return next()
	} catch (e) {
		req.user = null;
		return next()
	}
})

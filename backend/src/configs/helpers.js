const jwt = require("jsonwebtoken")

function authUser(req, res, next) {
				if (!req.headers["authorization"]) return "No auth header"
				if (!req.headers["authorization"].token) return "Auth token not provided"

				const token = req.headers["authorization"].token;
				const result = jwt.verify(token, process.env.SECRET);
				console.log(result);

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

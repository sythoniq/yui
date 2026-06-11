const bcrypt = require("bcryptjs")
const prisma = require("../configs/prisma.js")

const jwtSign = require("../configs/helpers.js").signJwt;

async function getUser(req, res, next) {
				//TODO: A function to get a user, could be useful to catch if a user exists and what not.
}

async function registerUser(req, res, next) {
				const { username, password } = req.body;

				const hashedPassword = await bcrypt.hash(password, 10);
				try {
								const user = await prisma.user.create({
												data: {
																userName: username,
																userHash: hashedPassword
												}
								})
								
								if (!user) {
												throw "Failed to register user!"
								} 
								return res.json({success: true, message: "User registered"});
				} catch (e) {
								next(e)
				}
}

async function loginUser(req, res, next) {
				const { username, password } = req.body;
				try {
								const user = await prisma.user.findUnique({
												where: {
																userName: username
												}
								})

								if (!user) {
												throw new Error("User not found, check username!")
								}

								const result = await bcrypt.compare(password, user.userHash);
								if (!result) {
								    throw new Error("User verification failed, incorrect password!")
								} 
								const token = jwtSign(user.userId)	
								if (!token)  throw new Error("Error generating jwt token, try again later!")
								return res.json({success: true, token})
				} catch(e) {
								next(e)
				}
}

async function getUserProfile(req, res, next) {
				// TODO: Have user profile image included via a url that is gonna be fetched from supabase or just have a generic user icon thingy... ig
}

async function updateUserProfile(req, res, next) {
				//TODO: Allow username and password changes...
}

module.exports = {
				registerUser,
				loginUser,
				getUserProfile,
				updateUserProfile
}

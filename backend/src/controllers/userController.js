const bcrypt = require("bcryptjs")
const prisma = require("../configs/prisma.js")



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
												throw user;
								} 
								return res.json({success: true, user});
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
								return res.json({success: true, message: "User logged in"})
				} catch(e) {
								next(e)
				}
}

async function getUserProfile(req, res, next) {

}

async function updateUserProfile(req, res, next) {
				//TODO
}

module.exports = {
				registerUser,
				loginUser,
				getUserProfile,
				updateUserProfile
}

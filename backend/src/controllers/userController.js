const bcrypt = require("bcryptjs")
const prisma = require("../configs/prisma.js")

const jwtSign = require("../configs/helpers.js").signJwt;

async function getUser(req, res, next) {
				const userId = Number(req.params.userId);

				if (!userId) {
								throw new Error("User Id not provided!")
				}

				try {
								const user = await prisma.user.findUnique({
												where: {
																userId
												}
								})

								if (!user) {
												throw new Error("User not found!")
								}
								return res.json({success: true, user: {"id": user.userId, "name": user.userName}})
				} catch(e) {
								next(e);
				}
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

async function updateUserProfile(req, res, next) {
				//TODO: Allow username and password changes...
				//This has to wait until i decided on how to add user image profiles and how i will implement the changing of that stuff, prolly gonna use supabase tbf
}

module.exports = {
				getUser,
				registerUser,
				loginUser,
				updateUserProfile
}

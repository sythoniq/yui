require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const prisma = require("../libs/prisma.js")

async function registerUser(req, res, next) {
				try {
								const { username, password } = req.body 

								const hashedPassword = await bcrypt.hash(password, 10);

								const user = await prisma.user.create({
												data: {
																user_name: username,
																user_hash: hashedPassword
												}
								})
								return res.json({
												success: true,
												user: {
																userId: user.user_id,
																userName: user.user_name
												}
								})
				} catch(e) {
								return res.status(500).json({success: false, message: "Error creating user"});
				}
}

async function loginUser(req, res) {
				try {
								const { username, password } = req.body;

								const user = await prisma.user.findUnique({
												where: {
																user_name: username
												}
								})

								if (!user) {
												return res.json(404).json({success: false, message: "User not found"})
								}
								
								const result = await bcrypt.compare(password, user.user_hash)

								if (!result) {
												return res.json(401).json({success: false, message: "Incorrect password..."})
								}

								const token = jwt.sign({userid: user.user_id, iat: Date.now()}, process.env.JWT_SECRET, {expiresIn: '7d'});

								return res.json({
												success: true,
												token
								})
				} catch(e) {
								console.error(e);
								return res.status(500).json({success: false, message: "Failed to login the user"})
				} 
}

async function getUsers(req, res) {
				try {
								let users = await prisma.user.findMany({
												omit: {
																user_hash: true
												}
								});

								if (req.user) {
												users = users.filter((usr) => usr.user_id != req.user.userid)
								}

								return res.json({success: true, users});
				} catch (e) {
								console.error(e)
								return res.status(404).json({success: false, message: "Unexpected Error"});
				}
}


module.exports = {
				registerUser,
				loginUser,
				getUsers
}

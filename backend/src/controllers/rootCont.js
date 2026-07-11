require("dotenv").config()

const { createClient } = require("@supabase/supabase-js")
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) // Project url n secret key (to bypass rls) are what I have here...
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

								if (req.user == null) {
												return res.json({sucess: true, users})
								}

								const userId = req.user.userid;
								users = users.filter((usr) => usr.user_id != userId);

								return res.json({sucess: true, users});
				} catch (e) {
								console.error(e)
				}
}

async function authUser(req, res) {
				const authHeader = req.headers["authorization"]
				if (!authHeader) {
								return res.json({success: false, message: "Failed to auth"})
				}
				const token = authHeader.split(" ")[1]

				const result = jwt.verify(token, process.env.JWT_SECRET);
				if (result) {
								const user = await prisma.user.findUnique({
												where: {
																user_id: Number(result.userid)
												},
												omit: {
																user_hash: true
												}
								})

								return res.json({success: true, message: "Authed", user})
				}
				return res.json({success: false, message: "Unauthed"})
}

async function getUserProfile(req, res) {
				const user = await prisma.user.findUnique({
								where: {
												user_id: Number(req.params.userId),
								},
								omit: {
												user_hash: true
								},
								include: {
												profile_image: {
																select: {
																				image_bytea: true
																}
												}
								}
				})

				if (!user) {
								return res.status(404).json({success: false, message: "User not found"})
				}

				return res.json({success: true, user});
}

async function updateUserProfile(req, res) {
				const user = await prisma.user.findUnique({
								where: {
												user_id: Number(req.params.userId)
								}
				})

				if (req.user.userid != user.user_id) {
								return res.status(501).json({success: false, message: "Unauthorized"})
				}

				if (!user) {
								return res.status(404).json({success: false, message: "User not found"})
				}

				const file = req.file;
				const { data, error } = await supabase.storage.from('yui').upload(`/${file.originalname}`, file, {
								upsert: true,
								contentType: file.mimetype
				})

				if (error) {
								return res.status(500).json({success: false, error})
				}

				const response = supabase.storage.from("yui").getPublicUrl(`/${file.originalname}`);

				await prisma.user.update({
								where: {
												user_id: user.user_id
								},
								data: {
												profile_image: {
																create: {
																				image_url: response.data.publicUrl
																}
												}
								}
				})

				const profile = await prisma.profile.findMany({})

				return res.json({success: true, profile})
}

module.exports = {
				registerUser,
				loginUser,
				getUsers,
				authUser,
				getUserProfile,
				updateUserProfile
}

require("dotenv").config()

// const { createClient } = require("@supabase/supabase-js")
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) // Project url n secret key (to bypass rls) are what I have here...
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const prisma = require("../libs/prisma.js")

// ERROR: Need to scrap this and properly implement a owner based upload system with supabase... literally a useless function atm

/* async function uploadProfileImage(file, user) {
	// Function to upload the users profile image to supabase just so that I can clean up abit
	const { data, error } = await supabase.storage.from('yui').upload(`/${file.originalname}`, file.buffer, {
		upsert: true,
		contentType: file.mimetype
	})

	if (error) {
		return error;
	}

	const response = supabase.storage.from("yui").getPublicUrl(`/${file.originalname}`);

	if (user.profile_image.length <= 0) {
		const profile = await prisma.user.update({
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

		return profile;
	}

	const imgId = user.profile_image[0].image_id;
	const profile = await prisma.profile.update({
		where: {
			image_id: imgId
		},
		data: {
			image_url: response.data.publicUrl
		}
	})

	return profile
} */

async function registerUser(req, res) {
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
		return res.status(500).json({success: false, message: "Failed to create user", error: e})
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
			return res.status(404).json({success: false, message: "User not found"})
		}

		const result = await bcrypt.compare(password, user.user_hash);
		if (!result) {
			return res.status(401).json({success: false, message: "Invalid login credentials"})
		}

		const token = jwt.sign({userid: user.user_id, iat: Date.now()}, process.env.JWT_SECRET, {expiresIn: '7d'});
		return res.status(200).json({ success: true, token })

	} catch(e) {
		return res.status(500).json({success: false, message: "Failed to login the user", error: e})
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
			return res.status(200).json({success: true, users})
		}

		const userId = req.user.userid;
		users = users.filter((usr) => usr.user_id != userId);

		return res.status(200).json({success: true, users});
	} catch (e) {
		res.status(501).json({success: false, error: "Failed to fetch users!"})
	}
}

async function authUser(req, res) {
	try {
		if (!req.headers["authorization"]) {
			throw new Error("Authorization header not set")
		}
		const token = req.headers["authorization"].split(" ")[1]

		if (!token) {
			return res.status(401).json({success: false, message: "Verification token not provided"})
		}
		const result = jwt.verify(token, process.env.JWT_SECRET);

		if (!result) {
			return res.status(404).json({success: false, message: "Failed to verify user"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: result.userid
			}, 
			omit: {
				user_hash: true
			}
		})

		if (!user) {
			return res.status(404).json({success: false, message: "User not found"})
		}

		return res.status(200).json({success: true, message: "User verified", user})
	} catch(e) {
		return res.status(500).json({success: false, message: "Unexpected error occurred", error: e})
	}
}

async function getUserProfile(req, res) {
	try {
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
						image_url: true
					}
				}
			}
		})

		if (!user) {
			return res.status(404).json({success: false, message: "User not found"})
		}

		return res.json({success: true, user});
	} catch(e) {
		return res.status(500).json({success: false, message: "Failed to get user profile", error: e})
	}
}

// ERROR: This function is useless until i fix the user profile upload process..
async function updateUserProfile(req, res) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.params.userId)
			},
			include: {
				profile_image: true
			}
		})

		if (req.user.userid != user.user_id) {
			return res.status(501).json({success: false, message: "Unauthorized"})
		}

		if (!user) {
			return res.status(404).json({success: false, message: "User not found"})
		}

		const file = req.file;

		if (!file) {
			throw new Error("Profile file not found")
		}

		/* const profile = await uploadProfileImage(file, user);
		if (!profile) {
			return res.status(501).json({success: false, message: "Error uploading profile image to supabase"})
		}
		*/

		return res.json({success: true, message: "dead route atm"})
	} catch(e) {
		return res.status(500).json({ success: false, message: "Failed to update user profile", error: e})
	}
}

module.exports = {
	registerUser,
	loginUser,
	getUsers,
	authUser,
	getUserProfile,
	updateUserProfile
}

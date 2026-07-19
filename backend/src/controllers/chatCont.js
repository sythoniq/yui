const prisma = require("../libs/prisma.js")

async function getChat(req, res) {
	try {
		// Auth check
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized to chat"})
		}

		const currentUserId = Number(req.user.userid);
		const recipientId = Number(req.params.userId);

		const recipient = await prisma.user.findUnique({
			where: {
				user_id: recipientId
			},
			omit: {
				user_hash: true
			},
			include: {
				profile_image: true
			}
		})

		if (!recipient) {
			return res.status(404).json({success: false, message: "Recipient user not found"})
		}

		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						sender_id: currentUserId, receiver_id: recipientId
					},
					{
						sender_id: recipientId, receiver_id: currentUserId
					}
				]
			},
			orderBy: {
				message_date: "asc"
			},
			include: {
				sender: {
					omit: {
						user_hash: true
					}
				},
				receiver: {
					omit: {
						user_hash: true
					}	
				}
			},
		})

		return res.json({
			success: true,
			messages,
			recipient
		})
	} catch(e) {
		return res.status(500).json({success: false, message: "Unexpected error occurred", error: e})
	}
}

async function sendChat(req, res) {
	try {
		if (!req.user) {
			return res.status(401).json({ success: false, message: "Unauthorized to send message"})
		}

		const senderId = Number(req.user.userid);
		const receiverId = Number(req.params.userId);

		const receiver = await prisma.user.findUnique({
			where: {
				user_id: receiverId
			}
		})

		const messageBody = req.body.message
		const message = await prisma.message.create({
			data: {
				message_content: messageBody,
				sender_id: senderId,
				receiver_id: receiverId
			}
		})

		return res.status(200).json({
			success: true,
			message
		})
	}catch(e) {
		return res.status(500).json({success: false, message: "Unexpected error occured", error: e})
	}
}

module.exports = {
	getChat,
	sendChat
}

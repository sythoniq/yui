const prisma = require("../libs/prisma.js")

async function getChat(req, res) {
				try {
								// Auth check
								if (!req.user) {
												return res.status(401).json({message: "Unathorized"})
								}
								const currentUserId = Number(req.user.userid);
								const recipientId = Number(req.params.userId);

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
								})

								// What a janky way to filter messages, feels like there would be a better way to do this tbh... but idk how atm
								const sentMessages = messages.filter((msg) => msg.sender_id == currentUserId);
								const receivedMessages = messages.filter((msg) => msg.receiver_id == currentUserId);

								return res.json({
												success: true,
												messages: {
																sentMessages,
																receivedMessages
												}
								})
				} catch(e) {
								console.error(e)
								return res.status(500).json({success: false, message: "Unexpected error occurred"})
				}
}

async function sendChat(req, res) {
				try {
								if (!req.user) {
												return res.status(401).json({message: "Unauthorized"})
								}

								const senderId = Number(req.user.userid);
								const receiverId = Number(req.params.userId);

								const messageBody = req.body.message

								const message = await prisma.message.create({
												data: {
																message_content: messageBody,
																sender_id: senderId,
																receiver_id: receiverId
												}
								})

								return res.json({
												success: true,
												message
								})
				}catch(e) {
								console.log(e)
								return res.json({success: false, message: "Database error sending message"})
				}
}

module.exports = {
				getChat,
				sendChat
}

const prisma = require("../configs/prisma.js")

async function getChat(req, res, next) {
				try {
								const targetUserId = Number(req.params.userId);
								const currentUserId = Number(req.user.userId);
								const messages = await prisma.user.findUnique({
												where: {
																OR: [
																				{ senderId: currentUserId, receiverId: targetUserId },
																				{ senderId: targetUserId, receiverId: currentUserId }
																]
												},
												include: {
																sentMessages: true,
																receivedMessages: true
												}
								})

								return res.json({success: true, messages: {
												sent: messages.sentMessages,
												received: messages.receivedMessages
								}});
				} catch(e) {
								console.log(e);
								next(e);
				}
}

async function sendMessage(req, res, next) {
				try {
								const sender = req.user.userId;
								const receiver = req.params.userId;

								const message = await prisma.message.create({
												data: {
																messageContent: req.body.messageBody,
																receiverId: Number(receiver),
																senderId: Number(sender)
												}
								})

								return res.json({success: true, message});
				} catch (e) {
								console.log(e);
								next(e)
				}
}

module.exports = {
				getChat,
				sendMessage
}

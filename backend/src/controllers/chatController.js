const prisma = require("../configs/prisma.js")

async function getChat(req, res, next) {
				try {
								const currentUser = req.user;
								const messages = await prisma.user.findUnique({
												where: {
																userId: currentUser.userId
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

const prisma = require("../configs/prisma.js")

async function getChat(req, res, next) {
				try {
								const targetUserId = Number(req.params.userId);
								const currentUserId = Number(req.user.userId);
								const messages = await prisma.message.findMany({
												where: {
																OR: [
																				{ sender_id: currentUserId, receiver_id: targetUserId },
																				{ sender_id: targetUserId, receiver_id: currentUserId }
																]
												},
												orderBy: {
																message_date: "asc"
												}
								})

								return res.json({success: true, messages});
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
																message_content: req.body.messageBody,
																receiver_id: Number(receiver),
																sender_id: Number(sender)
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

const prisma = require("../lib/prisma.js")

async function sendChat(req, res, next) {
  console.log(req)
  try {
    const receiverId = Number(req.params.userId);
    const senderId = Number(req.user.userId)
    const text = req.body.content
    const message = await prisma.message.create({
      data: {
        messageContent: text,
        receiverId,
        senderId        
      }
    })

    if (!message) {
      throw new Error("Error sending message")
    }
    return res.json({success: true, message})
  } catch (e) {
    console.log(e)
    return res.json({success: false, error: e})
  }
}

module.exports = {
  sendChat
}

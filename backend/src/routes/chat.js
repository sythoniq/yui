const { Router } = require("express")
const chat = Router();

const controller = require("../controllers/chatController.js")

chat.get("/:userId", controller.getChat);

chat.post("/:userId/send", controller.sendMessage);

module.exports = chat;

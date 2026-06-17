const { Router } = require("express")
const chat = Router();

const auth = require("../configs/helpers.js").authUser;

const controller = require("../controllers/chatController.js")

chat.get("/:userId", auth, controller.getChat);

chat.post("/:userId/send", auth, controller.sendMessage);

module.exports = chat;

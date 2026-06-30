const { Router } = require("express");
const chat = Router()

const controller = require("../controllers/chatCont.js")

// Get the chat between 2 users by getting the current users id and the receipent id from the params...
chat.get("/:userId", controller.getChat)

chat.post("/send/:userId", controller.sendChat);

module.exports = chat;

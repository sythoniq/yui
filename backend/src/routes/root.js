const { Router } = require("express")
const root = Router()
const controller = require('../controllers/rootController.js')
const auth = require("../lib/auth.js")

root.get("/users", controller.getAllUsers);
root.post("/chat/:userId", auth.authorizeUser, controller.sendChat)

module.exports = root

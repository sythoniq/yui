const { Router } = require("express")
const root = Router()
const controller = require('../controllers/rootController.js')

root.post("/chat/:userId", controller.sendChat)

module.exports = root

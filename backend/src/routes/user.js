const { Router } = require("express")
const user = Router()
const controller = require("../controllers/userController.js");

user.get("/auth", controller.authUser)

user.post("/login", controller.loginUser)
user.post("/register", controller.registerUser)

module.exports = user;

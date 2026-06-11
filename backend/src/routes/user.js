const { Router } = require("express")
const user = Router()

const controller = require("../controllers/userController.js")

user.get("/:userId/profile", controller.getUserProfile);

user.post("/register", controller.registerUser)
user.post("/login", controller.loginUser);
user.post("/:userId/profile/edit", controller.updateUserProfile);

module.exports = user;

require("dotenv").config()

const { Router } = require("express");
const root = Router()

const controller = require("../controllers/rootCont.js")

root.get("/", controller.getUsers);
root.get("/auth", controller.authUser);

root.get("/user/:userId", controller.getUserProfile)

root.post("/user/:userId", controller.updateUserProfile)

root.post("/register", controller.registerUser)
root.post("/login", controller.loginUser)

module.exports = root;

require("dotenv").config()

const { Router } = require("express");
const root = Router()

const controller = require("../controllers/rootCont.js")

root.get("/", controller.getUsers)

root.post("/register", controller.registerUser)
root.post("/login", controller.loginUser)

module.exports = root;

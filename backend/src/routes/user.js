const { Router } = require("express")
const user = Router()

const auth = require("../configs/helpers.js").authUser;
const controller = require("../controllers/userController.js")

user.get("/", controller.getAllUsers);
user.get("/:userId/profile", controller.getUser);

user.get("/auth", auth, (req, res, next) => {
				res.json({success: true, message: "User verified!", user: req.user})
})

user.post("/register", controller.registerUser)
user.post("/login", controller.loginUser);
user.post("/:userId/profile/edit", controller.updateUserProfile);

module.exports = user;

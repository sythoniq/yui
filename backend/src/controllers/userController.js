const bcrypt = require("bcryptjs")
const prisma = require("../libs/primsa.js")

async function registerUser(req, res, next) {
  const { username, password } = req.body; 
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: username,
      }
    })

    if (user) {
      throw new Error("Username is taken!")
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userName: username,
        userHash: passwordHash
      }
    })

    if (!newUser) {
      throw new Error("Serverside error when creating a user!")
    }

    return res.json({success: true, message: "User created successfully", newUser});
  } catch (e) {
    return res.json({success: false, error: e});
  }
}

async function loginUser(req, res, next) {

}

async function authUser(req, res, next) {

} 

module.exports = {
  registerUser,
  loginUser,
  authUser
}

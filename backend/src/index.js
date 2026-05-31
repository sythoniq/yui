const passport = require("passport")
const cors = require('cors')
const express = require("express")
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const root = require("./routes/root.js")
const user = require("./routes/user.js")

app.use("/", root)
app.use("/user", user)

app.listen(3000, (error) => {
  if (error) {
    console.error(error)
  }
  console.log("Server running on 3000")
})

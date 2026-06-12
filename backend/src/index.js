require("dotenv").config()
const cors = require("cors")

const express = require("express")

const app = express()

app.use(cors());
app.use(express.json())

const user = require("./routes/user.js") // User route endpoints;
const chat = require("./routes/chat.js") // Chat route endpoints;

app.use("/user", user);
app.use("/chat", chat);

app.listen(3000, (error) => {
				if (error) {
								console.error(error)
				}
				console.log("Server running at 3000...")
})


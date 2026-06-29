const cors = require("cors");

const express = require("express");
const app = express();

const auth = require("./libs/auth.js")

const root = require("./routes/root.js")
const chat = require("./routes/chat.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(auth);

app.use("/", root);
app.use("/chat", chat)

app.listen(3000, (e) => {
				if (e) {
								console.error(e);
				}
				console.log("Server running on 3000")
})

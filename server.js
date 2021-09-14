const express = require("express")
const router = require("./routes/index")
require("dotenv").config()
require("./config/database")

const app = express()

app.use(express.static("public"))
app.use("/", router)

app.listen(process.env.PORT, () => console.log("Server running"))

const express = require("express")
const router = require("./routes/index")
require("dotenv").config()
require("./config/database")
const session = require("express-session")
const mongo = require("connect-mongodb-session")(session)

const store = new mongo({
  uri: process.env.MONGODB,
  collection: "sessions",
})

const app = express()

app.use(express.static("public"))
app.set("view engine", "pug")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

app.use("/", router)

app.listen(process.env.PORT, process.env.HOST || "0.0.0.0", () =>
  console.log("Server running")
)

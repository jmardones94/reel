require("dotenv").config()
const express = require("express")
const router = require("./routes/index")
const cors = require("cors")
const db = require("./config/database")
const session = require("express-session")

const SequelizeStore = require("connect-session-sequelize")(session.Store)

const store = new SequelizeStore({ db: db })

const app = express()

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "pug")
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

require("./config/associations")

store.sync()

db.sync().then(() => {
  app.use("/", router)
  app.listen(process.env.PORT, process.env.HOST || "0.0.0.0", () =>
    console.log("Server running")
  )
})

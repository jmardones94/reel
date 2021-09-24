const Sequelize = require("sequelize")

const db = new Sequelize("reel", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

module.exports = db

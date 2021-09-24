const Sequelize = require("sequelize")
const db = require("../config/database")

const Critic = db.define("critic", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  rate: { type: Sequelize.INTEGER, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
})

module.exports = Critic

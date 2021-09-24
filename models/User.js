const Sequelize = require("sequelize")
const db = require("../config/database")

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  admin: { type: Sequelize.BOOLEAN, defaultValue: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
})
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   admin: { type: Boolean, default: false },
//   preferredGenres: [{ type: String }],
//   favorites: [{ type: mongoose.Types.ObjectId, ref: "movie" }],
// })

// const User = mongoose.model("user", userSchema)

module.exports = User

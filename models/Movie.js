const Sequelize = require("sequelize")
const db = require("../config/database")

const Movie = db.define("movie", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.INTEGER, allowNull: false },
  photo: { type: Sequelize.STRING, allowNull: false },
  trailer: { type: Sequelize.STRING, allowNull: false },
  duration: { type: Sequelize.STRING, allowNull: false },
  plot: { type: Sequelize.STRING, allowNull: false },
  netflix: { type: Sequelize.BOOLEAN, defaultValue: false },
  amazonPrime: { type: Sequelize.BOOLEAN, defaultValue: false },
  hulu: { type: Sequelize.BOOLEAN, defaultValue: false },
  starPlus: { type: Sequelize.BOOLEAN, defaultValue: false },
  disneyPlus: { type: Sequelize.BOOLEAN, defaultValue: false },
  hboMax: { type: Sequelize.BOOLEAN, defaultValue: false },
})

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   year: { type: String, required: true },
//   director: { type: String, required: true },
// photo: { type: String, required: true },
// trailer: { type: String, required: true },
// duration: { type: String, required: true },
// plot: { type: String, required: true },
// genres: [{ type: String }],
// netflix: { type: Boolean, default: false },
// amazonPrime: { type: Boolean, default: false },
// hulu: { type: Boolean, default: false },
// starPlus: { type: Boolean, default: false },
// disneyPlus: { type: Boolean, default: false },
// hboMax: { type: Boolean, default: false },
//   critics: [
//     {
//       user: { type: mongoose.Types.ObjectId, ref: "user" },
//       rate: { type: Number },
//       content: { type: String },
//     },
//   ],
// })

// const Movie = mongoose.model("movie", movieSchema)

module.exports = Movie

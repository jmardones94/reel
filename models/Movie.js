const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  director: { type: String, required: true },
  photo: { type: String, required: true },
  genres: [{ type: String }],
  netflix: { type: Boolean, default: false },
  amazonPrime: { type: Boolean, default: false },
  hulu: { type: Boolean, default: false },
  starPlus: { type: Boolean, default: false },
  disneyPlus: { type: Boolean, default: false },
  hboMax: { type: Boolean, default: false },
  critics: [
    {
      user: { type: mongoose.Types.ObjectId, ref: "user" },
      rate: { type: Number },
      content: { type: String },
    },
  ],
})

const Movie = mongoose.model("movie", movieSchema)

module.exports = Movie

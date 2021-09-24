const Movie = require("../models/Movie")
const User = require("../models/User")
const Genre = require("../models/Genre")
const Director = require("../models/Director")
const Critic = require("../models/Critic")

const testControllers = {
  getUsers: async (req, res) => {
    const users = await User.findAll({ raw: true })
    res.json({ users })
  },
  getFavoritesByUserId: async (req, res) => {},
  getMovies: async (req, res) => {
    const movies = await Movie.findAll({
      include: [
        {
          model: Director,
          as: "director",
          attributes: ["name"],
        },
      ],
    })
    res.json({ movies })
  },
  getDirectors: async (req, res) => {
    const directors = await Director.findAll({
      include: [{ model: Movie, as: "movies" }],
    })
    res.json({ directors })
  },
}

module.exports = testControllers

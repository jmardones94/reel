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
    const movies = await Movie.findAll({ raw: true })
    res.json({ movies })
  },
}

module.exports = testControllers

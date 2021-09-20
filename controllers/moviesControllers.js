const Movie = require("../models/Movie")
const User = require("../models/User")

const moviesControllers = {
  addMovie: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (!(loggedIn && admin)) throw new Error("Unauthorized.")
      const {
        title,
        year,
        director,
        photo,
        plot,
        duration,
        trailer,
        genres,
        netflix,
        amazonPrime,
        hulu,
        starPlus,
        disneyPlus,
        hboMax,
      } = req.body
      const movie = await new Movie({
        title,
        year,
        director,
        photo,
        plot,
        duration,
        trailer,
        genres: genres.split(","),
        netflix: netflix === "on",
        amazonPrime: amazonPrime === "on",
        hulu: hulu === "on",
        starPlus: starPlus === "on",
        disneyPlus: disneyPlus === "on",
        hboMax: hboMax === "on",
      }).save()
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin, favorites },
        successMessage: `${movie.title} added!`,
        errorMessage: null,
      })
    } catch (e) {
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin, favorites },
        successMessage: null,
        errorMessage: e.message,
      })
    }
  },
  searchMovie: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      const { query } = req.query
      const results = await Movie.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { director: { $regex: query, $options: "i" } },
        ],
      })
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin, favorites },
        error: null,
        movies: results,
      })
    } catch (e) {
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin, favorites },
        error: e.message,
        movies: [],
      })
    }
  },
  addComment: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      const user = await User.findOne({ email })
      const movie = await Movie.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            critics: {
              user: user._id,
              rate: req.body.rate,
              content: req.body.content,
            },
          },
        },
        { new: true }
      ).populate({ path: "critics.user", select: "name email" })
      res.redirect(`/movie/${movie._id}`)
    } catch (e) {
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin, favorites },
        movie: {},
        edit: false,
        errorMessage: e.message,
      })
    }
  },
  deleteComment: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      const movie = await Movie.findOneAndUpdate(
        { "critics._id": req.params.id },
        { $pull: { critics: { _id: req.params.id } } },
        { new: true }
      )
      res.redirect(`/movie/${movie._id}`)
    } catch (e) {
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin, favorites },
        movie: {},
        edit: false,
        errorMessage: e.message,
      })
    }
  },
  updateComment: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (req.method === "GET") {
        const movie = await Movie.findOne({
          "critics._id": req.params.id,
        }).populate({ path: "critics.user", select: "name email" })
        res.render("movie", {
          title: "Movie",
          user: { loggedIn, name, email, admin, favorites },
          movie,
          edit: true,
          errorMessage: null,
        })
      } else {
        const movie = await Movie.findOneAndUpdate(
          { "critics._id": req.params.id },
          {
            $set: {
              "critics.$.content": req.body.content,
              "critics.$.rate": req.body.rate,
            },
          },
          { new: true }
        ).populate({ path: "critics.user", select: "name email" })
        res.redirect(`/movie/${movie._id}`)
      }
    } catch (e) {
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin, favorites },
        movie: {},
        errorMessage: e.message,
      })
    }
  },
}

module.exports = moviesControllers

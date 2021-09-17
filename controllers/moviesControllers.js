const Movie = require("../models/Movie")

const moviesControllers = {
  addMovie: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      if (!(loggedIn && admin)) throw new Error("Unauthorized.")
      const {
        title,
        year,
        director,
        photo,
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
        user: { loggedIn, name, email, admin },
        successMessage: `${movie.title} added!`,
        errorMessage: null,
      })
    } catch (e) {
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin },
        successMessage: null,
        errorMessage: e.message,
      })
    }
  },
  searchMovie: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      const results = await Movie.find({
        title: { $regex: "^" + req.query.title, $options: "i" },
      })
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin },
        error: null,
        movies: results,
      })
    } catch (e) {
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin },
        error: e.message,
        movies: [],
      })
    }
  },
}

module.exports = moviesControllers

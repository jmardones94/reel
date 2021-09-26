const Movie = require("../models/Movie")
const User = require("../models/User")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
const { Op } = require("sequelize")
const Critic = require("../models/Critic")

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
      if (!genres) throw new Error("You must specify at least one genre")
      if (director === "default")
        throw new Error("You must specify a director.")
      const movie = await Movie.create({
        title,
        year,
        directorId: director,
        photo,
        trailer,
        duration,
        plot,
        netflix: netflix === "on",
        amazonPrime: amazonPrime === "on",
        hulu: hulu === "on",
        starPlus: starPlus === "on",
        disneyPlus: disneyPlus === "on",
        hboMax: hboMax === "on",
      })
      await movie.addGenres(genres)
      const directors = await Director.findAll({ raw: true })
      const genresList = await Genre.findAll({ raw: true })
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin, favorites },
        directors,
        genres: genresList,
        successMessage: `${movie.title} added!`,
        errorMessage: null,
      })
    } catch (e) {
      const directors = await Director.findAll({ raw: true })
      const genresList = await Genre.findAll({ raw: true })
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin, favorites },
        directors,
        genres: genresList,
        successMessage: null,
        errorMessage: e.message,
      })
    }
  },
  searchMovie: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      const { query } = req.query
      const results = await Movie.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            // { "director.name": { [Op.like]: `%${query}%` } },
          ],
        },
        include: [
          { model: Director, as: "director", attributes: ["name"] },
          { model: Genre, as: "genres", attributes: ["name"] },
          { model: User, as: "critics" },
        ],
      })
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin, favorites },
        error: null,
        movies: results,
      })
    } catch (e) {
      console.log(e)
      res.render("movies", {
        title: "Movies",
        user: { loggedIn, name, email, admin, favorites },
        error: e.message,
        movies: [],
      })
    }
  },
  addComment: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Movie,
          as: "favorites",
        },
      ],
    })
    const movie = await Movie.findOne({
      where: { id: req.params.id },
      include: [{ model: User, as: "critics" }],
    })
    try {
      await Critic.create({
        rate: req.body.rate,
        content: req.body.content,
        userId: user.id,
        movieId: movie.id,
      })
      res.redirect(`/movie/${movie.id}`)
    } catch (e) {
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin },
        favorites: user.favorites,
        movie,
        edit: false,
        errorMessage: e.message,
      })
    }
  },
  deleteComment: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Movie,
          as: "favorites",
        },
      ],
    })
    const movie = await Movie.findOne({
      where: { id: req.params.id },
      include: [
        { model: Director, as: "director", attributes: ["name"] },
        { model: Genre, as: "genres" },
        { model: User, as: "critics", attributes: ["id", "name", "email"] },
      ],
    })
    try {
      await Critic.destroy({
        where: { movieId: req.params.id, userId: user.id },
      })
      res.redirect(`/movie/${movie.id}`)
    } catch (e) {
      console.log(e)
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin },
        favorites: user.favorites,
        movie,
        edit: false,
        errorMessage: e.message,
      })
    }
  },
  updateComment: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Movie,
          as: "favorites",
        },
      ],
    })
    const movie = await Movie.findOne({
      where: { id: req.params.id },
      include: [
        { model: Director, as: "director", attributes: ["name"] },
        { model: Genre, as: "genres" },
        { model: User, as: "critics", attributes: ["id", "name", "email"] },
      ],
    })
    try {
      if (req.method === "GET") {
        res.render("movie", {
          title: "Movie",
          user: { loggedIn, name, email, admin },
          movie,
          favorites: user.favorites,
          edit: true,
          errorMessage: null,
        })
      } else {
        const { content, rate } = req.body
        const critic = await Critic.findOne({
          where: { movieId: req.params.id, userId: user.id },
        })
        critic.rate = rate
        critic.content = content
        await critic.save()
        res.redirect(`/movie/${movie.id}`)
      }
    } catch (e) {
      console.log("[ERROR!]")
      console.log(e)
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin },
        movie,
        favorites: user.favorites,
        errorMessage: e.message,
      })
    }
  },
}

module.exports = moviesControllers

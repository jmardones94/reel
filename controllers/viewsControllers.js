const Movie = require("../models/Movie")
const User = require("../models/User")
const mail = require("../config/mail")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

const viewsControllers = {
  home: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    res.render("index", {
      title: "Home",
      error: null,
      user: { loggedIn, name, email, admin },
    })
  },
  movies: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    const movies = await Movie.findAll({
      include: [
        { model: Director, as: "director", attributes: ["name"] },
        { model: Genre, as: "genres", attributes: ["name"] },
        { model: User, as: "critics" },
      ],
    })
    res.render("movies", {
      title: "Movies",
      user: { loggedIn, name, email, admin },
      error: null,
      movies,
    })
  },
  movie: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    let user
    if (loggedIn) {
      user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: Movie,
            as: "favorites",
            attributes: ["id"],
          },
        ],
        attributes: ["id"],
      })
    }
    try {
      const movie = await Movie.findOne({
        where: { id: req.params.id },
        include: [
          { model: Director, as: "director", attributes: ["name"] },
          { model: Genre, as: "genres" },
          { model: User, as: "critics", attributes: ["id", "name", "email"] },
        ],
      })
      // return res.json(movie)
      res.render("movie", {
        title: "Movie",
        user: { loggedIn, name, email, admin },
        movie,
        favorites: user?.favorites || [],
        edit: false,
        errorMessage: null,
      })
    } catch (e) {
      console.log(e)
      res.redirect("/")
    }
  },
  contact: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      if (req.method === "GET") {
        res.render("contact", {
          title: "Contact",
          error: null,
          user: { loggedIn, name, email, admin },
          message: null,
        })
      } else {
        // mandar el mail
        const { subject, message } = req.body
        mail.transport.sendMail(
          mail.options(
            email,
            subject,
            `<div>
        <h3>Hello, ${name}!</h3>
        <h4>You recently wrote us the following message:</h4>
        <em>"${message}"</em>
        <p>We will write you back as soon as possible.</p>
        <p>Best regards,</p>
        <p>Reel Team</p>
        </div>`
          ),
          (err, info) => {
            if (err) {
              return res.render("contact", {
                title: "Contact",
                error: "We couldn't send your message, please try again later.",
                user: { loggedIn, name, email, admin },
                message: null,
              })
            }
            res.render("contact", {
              title: "Contact",
              error: null,
              user: { loggedIn, name, email, admin },
              message: "Message sent successfully!",
            })
          }
        )
      }
    } catch (e) {
      res.render("contact", {
        title: "Contact",
        error: "We couldn't send your message, please try again later.",
        user: { loggedIn, name, email, admin },
        message: null,
      })
    }
  },
  login: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      if (loggedIn) return res.redirect("/")
      res.render("login", {
        title: "Log In",
        error: null,
        user: { loggedIn, name, email, admin },
      })
    } catch (e) {
      res.redirect("/")
    }
  },
  signup: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      if (loggedIn) return res.redirect("/")
      res.render("signup", {
        title: "Sign Up",
        error: null,
        user: { loggedIn, name, email, admin },
      })
    } catch (e) {
      res.redirect("/")
    }
  },
  logout: async (req, res) => {
    req.session.destroy(() => res.redirect("/"))
  },
  favorites: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      const user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: Movie,
            as: "favorites",
            attributes: ["title", "photo", "id"],
          },
        ],
      })
      res.render("favorites", {
        title: "Favorites",
        user: { loggedIn, name, email, admin },
        favorites: user.favorites,
      })
    } catch (e) {
      console.log(e)
      res.render("index", {
        title: "Home",
        error: null,
        user: { loggedIn, name, email, admin },
      })
    }
  },
  admin: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      const directors = await Director.findAll({ raw: true })
      const genres = await Genre.findAll({
        raw: true,
        order: [["name", "ASC"]],
      })
      res.render("admin", {
        title: "Admin",
        user: { loggedIn, name, email, admin },
        directors,
        genres,
        successMessage: null,
        errorMessage: null,
      })
    } catch (e) {
      res.render("forbidden", {
        title: "Forbidden",
        error: e.message,
        user: { loggedIn, name, email, admin },
        userAccess: "admin",
      })
    }
  },
  e404: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    res.render("e404", {
      title: "Error 404",
      user: { loggedIn, name, email, admin },
    })
  },
}

module.exports = viewsControllers

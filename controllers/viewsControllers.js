const Movie = require("../models/Movie")

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
    const movies = await Movie.find().sort("-year").limit(10)
    res.render("movies", {
      title: "Movies",
      user: { loggedIn, name, email, admin },
      error: null,
      movies,
    })
  },
  contact: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    res.render("contact", {
      title: "Contact",
      error: null,
      user: { loggedIn, name, email, admin },
    })
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
      if (!loggedIn)
        throw new Error("You must be logged in to access this page.")
      res.render("favorites", {
        title: "Favorites",
        user: { loggedIn, name, email, admin },
      })
    } catch (e) {
      res.render("forbidden", {
        title: "Forbidden",
        user: { loggedIn, name, email, admin },
      })
    }
  },
  admin: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      if (loggedIn && admin) {
        res.render("admin", {
          title: "Admin",
          user: { loggedIn, name, email, admin },
          successMessage: null,
          errorMessage: null,
        })
      } else {
        throw new Error("This is an admin section and you don't have access.")
      }
    } catch (e) {
      res.render("forbidden", {
        title: "Forbidden",
        error: e.message,
        user: { loggedIn, name, email, admin },
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

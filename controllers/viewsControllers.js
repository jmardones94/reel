const Movie = require("../models/Movie")
const User = require("../models/User")
const mail = require("../config/mail")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

const viewsControllers = {
  home: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    res.render("index", {
      title: "Home",
      error: null,
      user: { loggedIn, name, email, admin, favorites },
    })
  },
  movies: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    const movies = await Movie.findAll({ raw: true })
    console.log(movies)
    res.render("movies", {
      title: "Movies",
      user: { loggedIn, name, email, admin, favorites },
      error: null,
      movies,
    })
  },
  movie: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      const movie = await Movie.findByPk({ _id: req.params.id })
      console.log(movie)
      res.render("index", {
        title: "Home",
        error: null,
        user: { loggedIn, name, email, admin, favorites },
      })
      // res.render("movie", {
      //   title: "Movie",
      //   user: { loggedIn, name, email, admin, favorites },
      //   movie,
      //   edit: false,
      //   errorMessage: null,
      // })
    } catch (e) {
      res.redirect("/")
    }
  },
  contact: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (req.method === "GET") {
        res.render("contact", {
          title: "Contact",
          error: null,
          user: { loggedIn, name, email, admin, favorites },
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
                user: { loggedIn, name, email, admin, favorites },
                message: null,
              })
            }
            res.render("contact", {
              title: "Contact",
              error: null,
              user: { loggedIn, name, email, admin, favorites },
              message: "Message sent successfully!",
            })
          }
        )
      }
    } catch (e) {
      res.render("contact", {
        title: "Contact",
        error: "We couldn't send your message, please try again later.",
        user: { loggedIn, name, email, admin, favorites },
        message: null,
      })
    }
  },
  login: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (loggedIn) return res.redirect("/")
      res.render("login", {
        title: "Log In",
        error: null,
        user: { loggedIn, name, email, admin, favorites },
      })
    } catch (e) {
      res.redirect("/")
    }
  },
  signup: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (loggedIn) return res.redirect("/")
      // res.redirect("/")
      res.render("signup", {
        title: "Sign Up",
        error: null,
        user: { loggedIn, name, email, admin, favorites },
      })
    } catch (e) {
      res.redirect("/")
    }
  },
  logout: async (req, res) => {
    req.session.destroy(() => res.redirect("/"))
  },
  favorites: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (!loggedIn)
        throw new Error("You must be logged in to access this page.")
      const user = await User.findAll({ raw: true, email })
      console.log(user)
      res.render("index", {
        title: "Home",
        error: null,
        user: { loggedIn, name, email, admin, favorites },
      })
      // res.render("favorites", {
      //   title: "Favorites",
      //   user: { loggedIn, name, email, admin, favorites },
      //   favorites: user.favorites,
      // })
    } catch (e) {
      res.render("index", {
        title: "Home",
        error: null,
        user: { loggedIn, name, email, admin, favorites },
      })
      // res.render("forbidden", {
      //   title: "Forbidden",
      //   user: { loggedIn, name, email, admin, favorites },
      //   userAccess: "logged in",
      // })
    }
  },
  admin: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    try {
      if (loggedIn && admin) {
        const directors = await Director.findAll({ raw: true })
        const genres = await Genre.findAll({ raw: true })
        console.log(genres)
        // res.redirect("/")
        res.render("admin", {
          title: "Admin",
          user: { loggedIn, name, email, admin },
          directors,
          genres,
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
        user: { loggedIn, name, email, admin, favorites },
        userAccess: "admin",
      })
    }
  },
  e404: async (req, res) => {
    const { loggedIn, name, email, admin, favorites } = req.session
    res.render("e404", {
      title: "Error 404",
      user: { loggedIn, name, email, admin, favorites },
    })
  },
}

module.exports = viewsControllers

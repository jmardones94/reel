const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const Movie = require("../models/Movie")

const usersControllers = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body
      if (password.length < 6)
        throw new Error("Password must have at least 6 characters.")
      const hashedPass = await bcryptjs.hash(password, 10)
      const user = await User.create({ name, email, password: hashedPass })
      req.session.loggedIn = true
      req.session.name = user.dataValues.name
      req.session.email = user.dataValues.email
      req.session.admin = user.dataValues.admin
      res.redirect("/")
    } catch (e) {
      res.render("signup", {
        title: "Sign Up",
        error: e.message,
        user: { loggedIn: false },
      })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email },
        include: [{ model: Movie, as: "favorites" }],
      })
      if (!user) throw new Error("Invalid credentials.")
      const isValidPassword = await bcryptjs.compare(password, user.password)
      if (!isValidPassword) throw new Error("Invalid credentials.")
      req.session.loggedIn = true
      req.session.name = user.name
      req.session.email = user.email
      req.session.admin = user.admin
      // return res.json({ user })
      res.redirect("/")
    } catch (e) {
      res.render("login", {
        title: "Log In",
        error: e.message,
        user: { loggedIn: false },
      })
    }
  },
  toggleFavorites: async (req, res) => {
    const { loggedIn, name, email, admin } = req.session
    try {
      const user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: Movie,
            as: "favorites",
            attributes: ["id"],
          },
        ],
      })
      console.log("[FAVS]")
      // console.log(user.dataValues.favorites[0].dataValues)
      console.log("[USER]")
      console.log(user)
      if (
        user.dataValues.favorites.some(
          (m) => m.dataValues.id.toString() === req.params.id
        )
      ) {
        console.log("Entré al delete.")
        await user.setFavorites(
          user.dataValues.favorites.filter(
            (m) => m.dataValues.id.toString() !== req.params.id
          )
        )
      } else {
        console.log("Entré al add.")
        await user.addFavorite(req.params.id)
      }
      // req.session.favorites = user.favorites.map((f) => f.toString())
      res.redirect(`/movie/${req.params.id}`)
    } catch (e) {
      console.log(e)
      res.redirect("/")
    }
  },
}

module.exports = usersControllers

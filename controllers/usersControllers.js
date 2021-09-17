const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const usersControllers = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const emailInUse = await User.findOne({ email })
      if (emailInUse) throw new Error("Email already in  use.")
      const hashedPass = await bcryptjs.hash(password, 10)
      if (password.length < 6)
        throw new Error("Password must have at least 6 characters.")
      const user = new User({ name, email, password: hashedPass })
      await user.save()
      req.session.loggedIn = true
      req.session.name = user.name
      req.session.email = user.email
      req.session.admin = user.admin
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
      const user = await User.findOne({ email })
      if (!user) throw new Error("Invalid credentials.")
      const isValidPassword = await bcryptjs.compare(password, user.password)
      if (!isValidPassword) throw new Error("Invalid credentials.")
      req.session.loggedIn = true
      req.session.name = user.name
      req.session.email = user.email
      req.session.admin = user.admin
      res.redirect("/")
    } catch (e) {
      res.render("login", {
        title: "Log In",
        error: e.message,
        user: { loggedIn: false },
      })
    }
  },
}

module.exports = usersControllers

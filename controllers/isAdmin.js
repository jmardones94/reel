module.exports = (req, res, next) => {
  const { loggedIn, admin, name, email, favorites } = req.session
  if (!admin) {
    res.render("forbidden", {
      title: "Forbidden",
      error: "Access denied.",
      user: { loggedIn, name, email, admin, favorites },
      userAccess: "admin",
    })
  } else {
    next()
  }
}

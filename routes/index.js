const express = require("express")
const moviesControllers = require("../controllers/moviesControllers")
const viewsControllers = require("../controllers/viewsControllers")
const usersControllers = require("../controllers/usersControllers")
const isAdmin = require("../controllers/isAdmin")
const isLoggedIn = require("../controllers/isLoggedIn")

const router = express.Router()

router.route("/").get(viewsControllers.home)

router
  .route("/contact")
  .get(viewsControllers.contact)
  .post(isLoggedIn, viewsControllers.contact)
router
  .route("/signup")
  .get(viewsControllers.signup)
  .post(usersControllers.signup)

router.route("/login").get(viewsControllers.login).post(usersControllers.login)

router.route("/logout").get(isLoggedIn, viewsControllers.logout)

router
  .route("/movies")
  .get(viewsControllers.movies)
  .post(isLoggedIn, isAdmin, moviesControllers.addMovie)

router.route("/movies/search").get(moviesControllers.searchMovie)
router
  .route("/movie/add-comment/:id")
  .post(isLoggedIn, moviesControllers.addComment)
router
  .route("/movie/delete-comment/:id")
  .get(isLoggedIn, moviesControllers.deleteComment)

router
  .route("/user/favorite/:id")
  .get(isLoggedIn, usersControllers.toggleFavorites)

router
  .route("/movie/update-comment/:id")
  .get(isLoggedIn, moviesControllers.updateComment)
  .post(isLoggedIn, moviesControllers.updateComment)

router.route("/movie/:id").get(viewsControllers.movie)

router.route("/favorites").get(isLoggedIn, viewsControllers.favorites)

router.route("/admin").get(isLoggedIn, isAdmin, viewsControllers.admin)

router.route("*").get(viewsControllers.e404)

module.exports = router

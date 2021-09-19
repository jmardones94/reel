const express = require("express")
const moviesControllers = require("../controllers/moviesControllers")
const viewsControllers = require("../controllers/viewsControllers")
const usersControllers = require("../controllers/usersControllers")

const router = express.Router()

router.route("/").get(viewsControllers.home)

router
  .route("/contact")
  .get(viewsControllers.contact)
  .post(viewsControllers.contact)
router
  .route("/signup")
  .get(viewsControllers.signup)
  .post(usersControllers.signup)

router.route("/login").get(viewsControllers.login).post(usersControllers.login)

router.route("/logout").get(viewsControllers.logout)

router
  .route("/movies")
  .get(viewsControllers.movies)
  .post(moviesControllers.addMovie)

router.route("/movies/search").get(moviesControllers.searchMovie)
router.route("/movie/add-comment/:id").post(moviesControllers.addComment)
router.route("/movie/delete-comment/:id").get(moviesControllers.deleteComment)

router.route("/user/favorite/:id").get(usersControllers.toggleFavorites)

router
  .route("/movie/update-comment/:id")
  .get(moviesControllers.updateComment)
  .post(moviesControllers.updateComment)

router.route("/movie/:id").get(viewsControllers.movie)

router.route("/favorites").get(viewsControllers.favorites)

router.route("/admin").get(viewsControllers.admin)

router.route("*").get(viewsControllers.e404)

module.exports = router

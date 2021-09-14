const express = require("express")
const controllers = require("../controllers/controllers")

const router = express.Router()

router.route("/").get(controllers.home)

module.exports = router

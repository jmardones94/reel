const path = require("path")
const Test = require("../models/Test")

const controllers = {
  home: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views/index.html"))
  },
}

module.exports = controllers

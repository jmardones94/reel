const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
  name: String,
})

const Test = mongoose.model("test", testSchema)

module.exports = Test

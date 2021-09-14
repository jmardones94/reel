const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e))

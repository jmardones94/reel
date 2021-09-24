const Critic = require("../models/Critic")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
const Movie = require("../models/Movie")
const User = require("../models/User")

// Movie.belongsTo(Director, { through: "director" })
// Movie.belongsToMany(User, { through: Critic })
// User.belongsToMany(Movie, { through: Critic })

// User.belongsToMany(Movie, { through: "favorites" })
// Movie.belongsToMany(User, { through: "favorites" })
// Movie.belongsToMany(Genre, { through: "movies_genres" })
// Genre.belongsToMany(Movie, { through: "movies_genres" })

Director.hasMany(Movie, { as: "movies", foreignKey: "directorId" })
Movie.belongsTo(Director, { as: "director" })

User.belongsToMany(Movie, {
  through: Critic,
  as: "user_critics",
  foreignKey: "userId",
})

Movie.belongsToMany(User, {
  through: Critic,
  as: "critics",
  foreignKey: "movieId",
})

User.belongsToMany(Movie, {
  through: "user_favorites_movies",
  as: "favorites",
})
Movie.belongsToMany(User, { through: "user_favorites_movies" })

Movie.belongsToMany(Genre, { through: "movies_genres", as: "genres" })
Genre.belongsToMany(Movie, { through: "movies_genres", as: "movies" })

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

User.hasMany(Critic, { as: "critics", foreignKey: "userId" })
Critic.belongsTo(User, { as: "author" })

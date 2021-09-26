const db = require("./config/database")
const Movie = require("./models/Movie")
const Genre = require("./models/Genre")
const Director = require("./models/Director")
require("./config/associations")

const movies = [
  {
    title: "Star Wars",
    year: "1977",
    director: "George Lucas",
    duration: "121",
    plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/vZ734NWnAHA",
    genres: ["Action", "Adventure", "Fantasy"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: true,
    hboMax: false,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: "1980",
    director: "Irvin Kershner",
    duration: "124",
    plot: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/JNwNXF9Y6kY",
    genres: ["Action", "Adventure", "Fantasy"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: true,
    hboMax: false,
  },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: "1983",
    director: "Richard Marquand",
    duration: "131",
    plot: "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/5UfA_aKBGMc",
    genres: ["Action", "Adventure", "Fantasy"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: true,
    hboMax: false,
  },
  {
    title: "Casablanca",
    year: "1942",
    director: "Michael Curtiz",
    duration: "102",
    plot: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/BkL9l7qovsE",
    genres: ["Drama", "Romance", "War"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: true,
  },
  {
    title: "La planète sauvage",
    year: "1973",
    director: "René Laloux",
    duration: "72",
    plot: "On a faraway planet where blue giants rule, oppressed humanoids rebel against their machine-like leaders.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BYjhhMDFlZDctYzg1Mi00ZmZiLTgyNTgtM2NkMjRkNzYwZmQ0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/ZkIAkDsiUoo",
    genres: ["Animation", "Sci-Fi"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: true,
  },
  {
    title: "Frankenstein",
    year: "1931",
    director: "James Whale",
    duration: "70",
    plot: "Dr. Frankenstein dares to tamper with life and death by creating a human monster out of lifeless body parts.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BMTQ0Njc1MjM0OF5BMl5BanBnXkFtZTgwNTY2NTUyMjE@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/BN8K-4osNb0",
    genres: ["Drama", "Horror", "Sci-Fi"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: false,
  },
  {
    title: "Psycho",
    year: "1960",
    director: "Alfred Hitchcock",
    duration: "109",
    plot: "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/DTJQfFQ40lI",
    genres: ["Horror", "Mystery", "Thriller"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: true,
  },
  {
    title: "Fight Club",
    year: "1999",
    director: "David Fincher",
    duration: "139",
    plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/SUXWAEX2jlg",
    genres: ["Drama"],
    netflix: false,
    amazonPrime: true,
    hulu: false,
    starPlus: true,
    disneyPlus: false,
    hboMax: false,
  },
  {
    title: "Pulp Fiction",
    year: "1994",
    director: "Quentin Tarantino",
    duration: "154",
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    genres: ["Crime", "Drama"],
    netflix: true,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: false,
  },
  {
    title: "Nobody",
    year: "2021",
    director: "Ilya Naishuller",
    duration: "92",
    plot: "A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/wZti8QKBWPo",
    genres: ["Action", "Crime", "Drama"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: false,
  },
  {
    title: "Luca",
    year: "2021",
    director: "Enrico Casarosa",
    duration: "95",
    plot: "On the Italian Riviera, an unlikely but strong friendship grows between a human being and a sea monster disguised as a human.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BZTQyNTU0MDktYTFkYi00ZjNhLWE2ODctMzBkM2U1ZTk3YTMzXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/mYfJxlgR2jw",
    genres: ["Animation", "Adventure", "Comedy"],
    netflix: false,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: true,
    hboMax: false,
  },
  {
    title: "Sen to Chihiro no kamikakushi",
    year: "2001",
    director: "Hayao Miyazaki",
    duration: "125",
    plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/ByXuk9QqQkk",
    genres: ["Animation", "Adventure", "Family"],
    netflix: true,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: false,
  },
  {
    title: "Majo no takkyûbin",
    year: "1989",
    director: "Hayao Miyazaki",
    duration: "103",
    plot: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BOTc0ODM1Njk1NF5BMl5BanBnXkFtZTcwMDI5OTEyNw@@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/embed/4bG17OYs-GA",
    genres: ["Animation", "Adventure", "Drama"],
    netflix: true,
    amazonPrime: false,
    hulu: false,
    starPlus: false,
    disneyPlus: false,
    hboMax: false,
  },
]

const directors = [
  "George Lucas",
  "Irvin Kershner",
  "Richard Marquand",
  "Michael Curtiz",
  "René Laloux",
  "James Whale",
  "Alfred Hitchcock",
  "David Fincher",
  "Quentin Tarantino",
  "Ilya Naishuller",
  "Enrico Casarosa",
  "Hayao Miyazaki",
]

const genres = [
  "action",
  "adventure",
  "fantasy",
  "drama",
  "romance",
  "war",
  "animation",
  "sci-fi",
  "horror",
  "mystery",
  "thriller",
  "crime",
  "comedy",
  "family",
]

db.sync({ force: true })
  .then(() => console.log("Database connected"))
  .then(() =>
    directors.forEach((director) => Director.create({ name: director }))
  )
  .then(() => genres.forEach((genre) => Genre.create({ name: genre })))
  .then(async () =>
    movies.forEach(async (movie) => {
      const newMovie = await Movie.create(movie)
      const director = await Director.findOne({
        where: { name: movie.director },
      })
      newMovie.setDirector(director)
      movie.genres.forEach(async (genre) => {
        const genreId = await Genre.findOne({ where: { name: genre } })
        newMovie.addGenre(genreId)
      })
    })
  )
  .catch((e) => console.log(e))

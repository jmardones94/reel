const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
  tls: { rejectUnauthorized: false },
})

const options = (to, subject, html) => {
  return {
    from: "Reel <reel.movie.reviewsmh@gmail.com>",
    to,
    cc: process.env.MAIL,
    subject,
    html,
  }
}

module.exports = {
  transport,
  options,
}

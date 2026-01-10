console.log('server running');

require("dotenv").config()
const express = require("express")
const axios = require("axios")
const app = express()
const { getYearStats } = require("./stats")
const cors = require("cors")
app.use(cors())


app.get("/stats", (req, res) => {
  const year = req.query.year || new Date().getFullYear()
  const stats = getYearStats(Number(year))
  res.json(stats)
})


app.get("/login", (req, res) => {
  const url =
    `https://www.strava.com/oauth/authorize` +
    `?client_id=${process.env.STRAVA_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=http://localhost:3000/callback` +
    `&approval_prompt=force` +
    `&scope=read,activity:read_all`

  res.redirect(url)
})

app.get("/callback", async (req, res) => {
  const code = req.query.code

  const tokenRes = await axios.post("https://www.strava.com/oauth/token", {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: "authorization_code"
  })

  console.log("TOKENS:", tokenRes.data)

  res.send("Authorization successful. Check terminal.")
})

app.listen(3000, () => {
  console.log("OAuth server running on http://localhost:3000")
})

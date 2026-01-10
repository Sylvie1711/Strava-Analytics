console.log("script starting...")

require("dotenv").config()
const axios = require("axios")
const fs = require("fs")


const CLIENT_ID = process.env.STRAVA_CLIENT_ID
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN

async function getAccessToken() {
  const res = await axios.post("https://www.strava.com/oauth/token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: "refresh_token"
  })

  return res.data.access_token
}

async function fetchAllActivities(accessToken) {
  let page = 1
  let all = []

  while (true) {
    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?per_page=200&page=${page}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )

    if (res.data.length === 0) break

    all = all.concat(res.data)
    page++
  }

  return all
}

async function run() {
  console.log("Refreshing access token...")
  const accessToken = await getAccessToken()

  console.log("Fetching activities from Strava...")
  const activities = await fetchAllActivities(accessToken)

  console.log(`Fetched ${activities.length} activities`)

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data")
  }

  fs.writeFileSync("data/activities.json", JSON.stringify(activities, null, 2))

  console.log("Saved to data/activities.json")
}

run().catch(err => {
  console.error(err.response?.data || err.message)
})

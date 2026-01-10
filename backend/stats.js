const fs = require("fs")

function loadActivities() {
  const raw = fs.readFileSync("data/activities.json")
  return JSON.parse(raw)
}

function getYearStats(year) {
  const activities = loadActivities()

  const runs = activities.filter(a =>
    a.type === "Run" &&
    new Date(a.start_date).getFullYear() === year
  )

  const totalDistance = runs.reduce((sum, r) => sum + r.distance, 0)
  const totalRuns = runs.length
  const longestRun = Math.max(...runs.map(r => r.distance))

  return {
    year,
    totalRuns,
    totalDistanceKm: (totalDistance / 1000).toFixed(1),
    longestRunKm: (longestRun / 1000).toFixed(1)
  }
}

module.exports = { getYearStats }

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function App() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/stats?year=2025")
      .then(res => res.json())
      .then(setStats)
  }, [])

  if (!stats) return <div>Loading...</div>

  const data = {
    labels: ["Total Runs", "Longest Run"],
    datasets: [
      {
        label: "2025",
        data: [stats.totalRuns, Number(stats.longestRunKm)]
      }
    ]
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Saket’s Strava Wrapped</h1>
      <p>Total Distance: {stats.totalDistanceKm} km</p>
      <div style={{ maxWidth: 600 }}>
        <Bar data={data} />
      </div>
    </div>
  )
}

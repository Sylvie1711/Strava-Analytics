"use client"

import { useEffect, useState } from "react"
import { YearInReview } from "@/components/year-in-review"
import { fetchStravaStats, YearSummary } from "@/lib/api"

export default function Page() {
  const [stravaId, setStravaId] = useState<string | null>(null)
  const [stats, setStats] = useState<YearSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get stravaId from URL params
    const params = new URLSearchParams(window.location.search)
    const stravaIdParam = params.get("stravaId")
    
    if (!stravaIdParam) {
      setLoading(false)
      return
    }

    setStravaId(stravaIdParam)
    
    // Fetch stats from backend
    const loadStats = async () => {
      try {
        const data = await fetchStravaStats(stravaIdParam)
        setStats(data)
      } catch (err) {
        setError("Failed to load your Strava stats. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your Strava stats...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!stravaId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">🏃 Strava Year Review</h1>
          <p className="text-muted-foreground mb-8">Connect your Strava account to see your 2024 running stats!</p>
          <button
            onClick={() => window.location.href = "/api/login"}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors w-full"
          >
            Connect with Strava
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <YearInReview stats={stats} />
    </div>
  )
}

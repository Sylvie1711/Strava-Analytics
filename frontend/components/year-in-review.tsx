"use client"

import { StatsOverview } from "./stats-overview"
import { ConsistencySection } from "./consistency-section"
import { PerformanceSection } from "./performance-section"
import { ProgressCharts } from "./progress-charts"
import { ActivityBreakdown } from "./activity-breakdown"
import { AthleteProfile } from "./athlete-profile"
import { YearSummary } from "@/lib/api"

interface YearInReviewProps {
  stats?: YearSummary | null
}

export function YearInReview({ stats }: YearInReviewProps) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              2024 Year in Review
            </div>
            <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight sm:text-7xl">
              Your Year of <span className="text-primary">Movement</span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Every mile, every climb, every moment that pushed you forward. This is your story.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <StatsOverview stats={stats} />
          <ConsistencySection />
          <PerformanceSection />
          <ProgressCharts />
          <ActivityBreakdown />
          <AthleteProfile />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Share your year with the world. Keep moving forward in 2025.</p>
        </div>
      </div>
    </div>
  )
}

import { Card } from "@/components/ui/card"
import { Activity, Clock, Calendar, Mountain, TrendingUp, Award } from "lucide-react"
import { YearSummary } from "@/lib/api"

interface StatsOverviewProps {
  stats?: YearSummary | null
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  // Use real stats if available, otherwise use mock data
  const displayStats = stats ? [
    {
      label: "Total Distance",
      value: `${stats.total_distance.toLocaleString()} km`,
      subtext: `${(stats.total_distance * 0.621371).toFixed(1)} miles`,
      icon: Activity,
      color: "text-chart-1",
    },
    {
      label: "Total Activities",
      value: stats.total_activities.toLocaleString(),
      subtext: `${Math.round(stats.total_activities / 12)} per month`,
      icon: Calendar,
      color: "text-chart-3",
    },
    {
      label: "Active Days",
      value: stats.active_days.toLocaleString(),
      subtext: `${Math.round((stats.active_days / 365) * 100)}% of the year`,
      icon: TrendingUp,
      color: "text-chart-4",
    },
    {
      label: "Longest Activity",
      value: `${stats.longest_activity.distance.toFixed(1)} km`,
      subtext: `${Math.floor(stats.longest_activity.duration / 60)}m ${stats.longest_activity.duration % 60}s`,
      icon: Award,
      color: "text-chart-5",
    },
    {
      label: "Biggest Elevation",
      value: `${stats.max_elevation_gain.toLocaleString()} m`,
      subtext: "Single activity",
      icon: Mountain,
      color: "text-chart-1",
    },
    {
      label: "Longest Streak",
      value: `${stats.longest_streak} days`,
      subtext: "Consecutive activities",
      icon: TrendingUp,
      color: "text-chart-2",
    },
  ] : [
    {
      label: "Total Distance",
      value: "2,847 km",
      subtext: "1,769 miles",
      icon: Activity,
      color: "text-chart-1",
    },
    {
      label: "Total Time",
      value: "187h 32m",
      subtext: "7.8 days moving",
      icon: Clock,
      color: "text-chart-2",
    },
    {
      label: "Total Activities",
      value: "243",
      subtext: "20 per month",
      icon: Calendar,
      color: "text-chart-3",
    },
    {
      label: "Active Days",
      value: "218",
      subtext: "60% of the year",
      icon: TrendingUp,
      color: "text-chart-4",
    },
    {
      label: "Longest Activity",
      value: "92.4 km",
      subtext: "4h 28m duration",
      icon: Award,
      color: "text-chart-5",
    },
    {
      label: "Biggest Elevation",
      value: "1,842 m",
      subtext: "Single activity",
      icon: Mountain,
      color: "text-chart-1",
    },
  ]

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="mt-2 text-muted-foreground">Your year at a glance — the numbers that define your dedication</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-card p-6 transition-colors hover:bg-accent/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.subtext}</p>
                </div>
                <div className={`rounded-lg bg-background p-3 ${stat.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

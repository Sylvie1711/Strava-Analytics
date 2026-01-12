import { Card } from "@/components/ui/card"
import { Activity, Clock, Calendar, Mountain, TrendingUp, Award } from "lucide-react"

interface StatsOverviewProps {
  stats?: {
    runs: number;
    km: number;
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  // Use real stats if available, otherwise use mock data
  const realStats = stats ? {
    runs: stats.runs,
    km: stats.km,
    miles: (stats.km * 0.621371).toFixed(1),
    avgPerMonth: Math.round(stats.runs / 12),
    activeDays: Math.round(stats.runs * 0.9), // Estimate
    longestActivity: (stats.km / stats.runs * 3).toFixed(1), // Rough estimate
    elevation: Math.round(stats.km * 10) // Rough estimate
  } : null

  const displayStats = realStats ? [
    {
      label: "Total Distance",
      value: `${realStats.km.toLocaleString()} km`,
      subtext: `${realStats.miles} miles`,
      icon: Activity,
      color: "text-chart-1",
    },
    {
      label: "Total Activities",
      value: realStats.runs.toLocaleString(),
      subtext: `${realStats.avgPerMonth} per month`,
      icon: Calendar,
      color: "text-chart-3",
    },
    {
      label: "Active Days",
      value: realStats.activeDays.toLocaleString(),
      subtext: `${Math.round((realStats.activeDays / 365) * 100)}% of the year`,
      icon: TrendingUp,
      color: "text-chart-4",
    },
    {
      label: "Longest Activity",
      value: `${realStats.longestActivity} km`,
      subtext: "Estimated",
      icon: Award,
      color: "text-chart-5",
    },
    {
      label: "Biggest Elevation",
      value: `${realStats.elevation.toLocaleString()} m`,
      subtext: "Estimated",
      icon: Mountain,
      color: "text-chart-1",
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

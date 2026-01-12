import { Card } from "@/components/ui/card"
import { Zap, Gauge, Target, Trophy } from "lucide-react"
import { YearSummary } from "@/lib/api"

interface PerformanceSectionProps {
  stats?: YearSummary | null
}

export function PerformanceSection({ stats }: PerformanceSectionProps) {
  const formatPace = (secondsPerKm: number) => {
    const minutes = Math.floor(secondsPerKm / 60)
    const seconds = Math.round(secondsPerKm % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const performances = [
    {
      label: "Fastest Pace",
      value: stats?.fastest_activity?.pace ? formatPace(stats.fastest_activity.pace) : "3:42",
      unit: "/km",
      subtext: stats?.fastest_activity?.distance ? `${stats.fastest_activity.distance.toFixed(1)} km` : "Oct 15 • Morning Run",
      icon: Zap,
      color: "text-chart-1",
    },
    {
      label: "Average Pace",
      value: stats?.avg_pace ? formatPace(stats.avg_pace) : "5:28",
    unit: "/km",
    subtext: "Across all runs",
    icon: Gauge,
    color: "text-chart-2",
  },
  {
    label: "Fastest 5K",
    value: stats?.personal_records?.find(r => r.distance === '5 km')?.time || "19:42",
    unit: "min",
    subtext: stats?.personal_records?.find(r => r.distance === '5 km')?.pace || "Personal best!",
    icon: Target,
    color: "text-chart-3",
  },
  {
    label: "Fastest 10K",
    value: stats?.personal_records?.find(r => r.distance === '10 km')?.time || "42:18",
    unit: "min",
    subtext: stats?.personal_records?.find(r => r.distance === '10 km')?.pace || "Race day",
    icon: Trophy,
    color: "text-chart-4",
  },
]

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Performance</h2>
        <p className="mt-2 text-muted-foreground">Your fastest moments — when you pushed past your limits</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {performances.map((perf) => {
          const Icon = perf.icon
          return (
            <Card key={perf.label} className="border-border bg-card p-6 transition-colors hover:bg-accent/50">
              <div className={`mb-4 inline-flex rounded-lg bg-background p-3 ${perf.color}`}>
                <Icon className="size-5" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{perf.label}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <p className="text-3xl font-bold">{perf.value}</p>
                <p className="text-sm text-muted-foreground">{perf.unit}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{perf.subtext}</p>
            </Card>
          )
        })}
      </div>

      {/* Hardest Workout */}
      <Card className="border-border bg-gradient-to-br from-card to-accent/10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hardest Workout</p>
            <h3 className="mt-2 text-2xl font-bold">Longest Activity</h3>
            <div className="mt-4 flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-xl font-bold">{stats?.longest_activity?.distance?.toFixed(1) || "92.4"} km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Elevation Gain</p>
                <p className="text-xl font-bold">{stats?.max_elevation_gain?.toLocaleString() || "1,842"} m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-xl font-bold">{stats?.longest_activity?.duration ? formatDuration(stats.longest_activity.duration) : "4h 28m"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Heart Rate</p>
                <p className="text-xl font-bold">-- bpm</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Trophy className="size-6 text-primary" />
          </div>
        </div>
      </Card>
    </section>
  )
}

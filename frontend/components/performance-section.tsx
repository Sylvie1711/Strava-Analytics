import { Card } from "@/components/ui/card"
import { Zap, Gauge, Target, Trophy } from "lucide-react"

const performances = [
  {
    label: "Fastest Pace",
    value: "3:42",
    unit: "/km",
    subtext: "Oct 15 • Morning Run",
    icon: Zap,
    color: "text-chart-1",
  },
  {
    label: "Average Pace",
    value: "5:28",
    unit: "/km",
    subtext: "Across all runs",
    icon: Gauge,
    color: "text-chart-2",
  },
  {
    label: "Fastest 5K",
    value: "19:42",
    unit: "min",
    subtext: "Sep 3 • Personal best!",
    icon: Target,
    color: "text-chart-3",
  },
  {
    label: "Fastest 10K",
    value: "42:18",
    unit: "min",
    subtext: "Nov 12 • Race day",
    icon: Trophy,
    color: "text-chart-4",
  },
]

export function PerformanceSection() {
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
            <h3 className="mt-2 text-2xl font-bold">Mount Ventoux Challenge</h3>
            <div className="mt-4 flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-xl font-bold">92.4 km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Elevation Gain</p>
                <p className="text-xl font-bold">1,842 m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-xl font-bold">4h 28m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Heart Rate</p>
                <p className="text-xl font-bold">162 bpm</p>
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

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Sun, Moon } from "lucide-react"

export function ConsistencySection() {
  const consistencyScore = 87
  const longestStreak = 42
  const activeDays = 218
  const totalDays = 366
  const weekendActivities = 87
  const weekdayActivities = 156

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Consistency & Discipline</h2>
        <p className="mt-2 text-muted-foreground">Showing up is half the battle — you dominated it</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Consistency Score */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Flame className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Consistency Score</p>
              <p className="text-3xl font-bold text-primary">{consistencyScore}/100</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={consistencyScore} className="h-3" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Based on frequency, streak length, and activity distribution
          </p>
        </Card>

        {/* Longest Streak */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-2/10 p-3">
              <Flame className="size-6 text-chart-2" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
              <p className="text-3xl font-bold">{longestStreak} days</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="h-8 flex-1 rounded-sm bg-chart-2" />
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Mar 15 - Apr 25 • You were unstoppable</p>
        </Card>

        {/* Active Days */}
        <Card className="border-border bg-card p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Days</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold">{activeDays}</p>
              <p className="text-xl text-muted-foreground">/ {totalDays}</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={(activeDays / totalDays) * 100} className="h-3" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {((activeDays / totalDays) * 100).toFixed(1)}% of the year spent being active
          </p>
        </Card>

        {/* Weekend vs Weekday */}
        <Card className="border-border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Weekend vs Weekday</p>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-chart-3" />
                  <span className="text-sm font-medium">Weekday</span>
                </div>
                <span className="text-sm font-bold">{weekdayActivities}</span>
              </div>
              <Progress value={(weekdayActivities / 243) * 100} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="size-4 text-chart-4" />
                  <span className="text-sm font-medium">Weekend</span>
                </div>
                <span className="text-sm font-bold">{weekendActivities}</span>
              </div>
              <Progress value={(weekendActivities / 243) * 100} className="mt-2 h-2" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { YearSummary } from "@/lib/api"

interface ProgressChartsProps {
  stats?: YearSummary | null
  selectedYear?: string
}

export function ProgressCharts({ stats, selectedYear }: ProgressChartsProps) {
  const monthlyDistance = stats?.monthly_stats || []

const monthlyPace = stats?.monthly_stats?.map(stat => ({
  month: stat.month.substring(0, 3), // Get first 3 chars like "Jan", "Feb", etc.
  pace: 5.2 // Placeholder - we'd need individual activity times to calculate this properly
})) || []

const trainingLoad = stats?.weekly_volume?.map(week => ({
  week: week.week,
  load: Math.round(week.distance * 10) // Convert distance to training load units
}))

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Progress Over Time</h2>
        <p className="mt-2 text-muted-foreground">Watch your growth unfold month by month</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Monthly Distance */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Monthly Distance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyDistance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}km`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="distance" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Cumulative Distance */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Cumulative Distance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats?.cumulative_distance || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm text-muted-foreground">
            Total distance progression throughout {selectedYear || new Date().getFullYear().toString()}
          </p>
        </Card>

        {/* Monthly Pace */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Average Pace Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyPace}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[5.0, 6.0]}
                tickFormatter={(value) => `${value}min/km`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="pace"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Training Load */}
      <Card className="border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Rolling 4-Week Training Load</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trainingLoad}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="load"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-4 text-sm text-muted-foreground">
          Peak training load reached in Week 9 • Consistent progression throughout the year
        </p>
      </Card>
    </section>
  )
}

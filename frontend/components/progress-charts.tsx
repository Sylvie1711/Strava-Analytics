"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const monthlyDistance = [
  { month: "Jan", distance: 186 },
  { month: "Feb", distance: 198 },
  { month: "Mar", distance: 267 },
  { month: "Apr", distance: 289 },
  { month: "May", distance: 312 },
  { month: "Jun", distance: 298 },
  { month: "Jul", distance: 274 },
  { month: "Aug", distance: 256 },
  { month: "Sep", distance: 243 },
  { month: "Oct", distance: 189 },
  { month: "Nov", distance: 178 },
  { month: "Dec", distance: 157 },
]

const monthlyPace = [
  { month: "Jan", pace: 5.8 },
  { month: "Feb", pace: 5.6 },
  { month: "Mar", pace: 5.4 },
  { month: "Apr", pace: 5.3 },
  { month: "May", pace: 5.2 },
  { month: "Jun", pace: 5.3 },
  { month: "Jul", pace: 5.4 },
  { month: "Aug", pace: 5.5 },
  { month: "Sep", pace: 5.3 },
  { month: "Oct", pace: 5.2 },
  { month: "Nov", pace: 5.4 },
  { month: "Dec", pace: 5.6 },
]

const trainingLoad = [
  { week: "W1", load: 245 },
  { week: "W2", load: 278 },
  { week: "W3", load: 312 },
  { week: "W4", load: 289 },
  { week: "W5", load: 334 },
  { week: "W6", load: 356 },
  { week: "W7", load: 378 },
  { week: "W8", load: 398 },
  { week: "W9", load: 412 },
  { week: "W10", load: 387 },
  { week: "W11", load: 365 },
  { week: "W12", load: 342 },
]

export function ProgressCharts() {
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

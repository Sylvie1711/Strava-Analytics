"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Bike, Footprints, Waves, TrendingUp } from "lucide-react"

const activityData = [
  { name: "Run", value: 1842, distance: "1,842 km", color: "hsl(var(--chart-1))" },
  { name: "Ride", value: 687, distance: "687 km", color: "hsl(var(--chart-2))" },
  { name: "Walk", value: 234, distance: "234 km", color: "hsl(var(--chart-3))" },
  { name: "Swim", value: 84, distance: "84 km", color: "hsl(var(--chart-4))" },
]

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Run: Footprints,
  Ride: Bike,
  Walk: TrendingUp,
  Swim: Waves,
}

export function ActivityBreakdown() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Activity Breakdown</h2>
        <p className="mt-2 text-muted-foreground">How you moved — your favorite ways to stay active</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Donut Chart */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Distance by Activity Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Activity Stats */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Total Distance Per Activity</h3>
          <div className="space-y-4">
            {activityData.map((activity) => {
              const Icon = activityIcons[activity.name]
              const total = activityData.reduce((sum, a) => sum + a.value, 0)
              const percentage = ((activity.value / total) * 100).toFixed(1)

              return (
                <div key={activity.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="size-5" style={{ color: activity.color }} />
                      <span className="font-medium">{activity.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{activity.distance}</p>
                      <p className="text-sm text-muted-foreground">{percentage}%</p>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: activity.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </section>
  )
}

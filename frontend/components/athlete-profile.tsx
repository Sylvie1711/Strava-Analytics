import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Compass, Calendar, Zap } from "lucide-react"

const athleteTypes = {
  "The Grinder": {
    icon: Flame,
    description: "Consistent, determined, and relentless. You show up day after day, rain or shine.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  "The Sprinter": {
    icon: Zap,
    description: "Fast and fierce. You live for the speed and the thrill of pushing your pace.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  "The Explorer": {
    icon: Compass,
    description: "Adventure calls your name. Every route is a journey, every mile a story.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  "The Weekend Warrior": {
    icon: Calendar,
    description: "You make the most of your time. Weekends are for epic adventures and PRs.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  "The Machine": {
    icon: Trophy,
    description: "Precision, power, and performance. You optimize everything and never miss a beat.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
}

// Logic to determine athlete type based on mock data
const determineAthleteType = (): keyof typeof athleteTypes => {
  // Based on the mock data:
  // - High consistency (218 active days)
  // - Good pace improvements
  // - Strong streak (42 days)
  // This suggests "The Grinder"
  return "The Grinder"
}

export function AthleteProfile() {
  const athleteType = determineAthleteType()
  const profile = athleteTypes[athleteType]
  const Icon = profile.icon

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Your Athlete Profile</h2>
        <p className="mt-2 text-muted-foreground">Based on your training patterns, consistency, and performance</p>
      </div>

      <Card className="border-border bg-gradient-to-br from-card via-card to-primary/5 p-8">
        <div className="flex flex-col items-center text-center">
          <div className={`mb-6 rounded-full ${profile.bgColor} p-6`}>
            <Icon className={`size-12 ${profile.color}`} />
          </div>

          <Badge className={`mb-4 ${profile.bgColor} ${profile.color} border-0 px-4 py-2 text-base font-bold`}>
            {athleteType}
          </Badge>

          <p className="mb-8 max-w-2xl text-balance text-lg text-muted-foreground">{profile.description}</p>

          <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-bold text-primary">218</p>
              <p className="mt-1 text-sm text-muted-foreground">Active Days</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-bold text-primary">42</p>
              <p className="mt-1 text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-bold text-primary">87</p>
              <p className="mt-1 text-sm text-muted-foreground">Consistency</p>
            </div>
          </div>
        </div>
      </Card>

      {/* All Profiles */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(athleteTypes).map(([name, data]) => {
          const TypeIcon = data.icon
          const isActive = name === athleteType

          return (
            <Card
              key={name}
              className={`border-border p-4 transition-all ${
                isActive ? "bg-primary/10 ring-2 ring-primary" : "bg-card opacity-50"
              }`}
            >
              <div className={`mb-3 inline-flex rounded-lg ${data.bgColor} p-2`}>
                <TypeIcon className={`size-4 ${data.color}`} />
              </div>
              <p className="text-sm font-semibold">{name}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

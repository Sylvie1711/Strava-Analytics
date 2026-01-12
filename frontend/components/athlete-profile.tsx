import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Compass, Calendar, Zap } from "lucide-react"
import { YearSummary } from "@/lib/api"

interface AthleteProfileProps {
  stats?: YearSummary | null
}

const athleteTypes = {
  "The Grinder": {
    icon: Flame,
    description: "Consistent, determined, and relentless. You show up day after day, rain or shine.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  "The Sprinter": {
    icon: Zap,
    description: "Fast and fierce. You live for the speed and thrill of pushing your pace.",
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

// Logic to determine athlete type based on real stats
const determineAthleteType = (stats: YearSummary | null | undefined): keyof typeof athleteTypes => {
  if (!stats) return "The Grinder"
  
  const { total_activities, active_days, longest_streak, avg_pace } = stats
  
  // Calculate metrics for athlete type determination
  const consistencyPercentage = (active_days / 365) * 100
  const hasGoodStreak = longest_streak >= 14
  const hasGoodPace = avg_pace > 0 && avg_pace < 360 // 6 min/km = 360 seconds
  
  if (consistencyPercentage >= 60 && hasGoodStreak) {
    return "The Grinder"
  } else if (hasGoodPace && total_activities >= 50) {
    return "The Sprinter" 
  } else if (total_activities >= 100) {
    return "The Explorer"
  } else if (consistencyPercentage >= 40) {
    return "The Weekend Warrior"
  } else {
    return "The Machine"
  }
}

export function AthleteProfile({ stats }: AthleteProfileProps) {
  const athleteType = determineAthleteType(stats)
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
              <p className="text-2xl font-bold text-primary">{stats?.active_days || 0}</p>
              <p className="mt-1 text-sm text-muted-foreground">Active Days</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-bold text-primary">{stats?.longest_streak || 0}</p>
              <p className="mt-1 text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-bold text-primary">{Math.round(((stats?.active_days || 0) / 365) * 100) || 0}</p>
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

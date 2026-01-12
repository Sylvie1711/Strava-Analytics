# Strava Year Review Metrics System

A pure, deterministic backend metrics calculation system for Strava Year in Review.

## 📁 File Structure

```
metrics/
├── types.ts           # TypeScript interfaces
├── totals.ts          # Basic totals and averages
├── streaks.ts         # Streak calculations
├── performance.ts     # Personal records and best times
├── breakdowns.ts      # Time-based and type-based breakdowns
├── achievements.ts    # Milestones and badges
├── index.ts          # Main buildYearSummary function
├── example.ts         # Usage examples
└── README.md         # This file
```

## 🚀 Usage

```typescript
import { buildYearSummary } from './metrics';

const activities = await fetchStravaActivities(userId);
const yearSummary = buildYearSummary(activities);
```

## 📊 Metrics Calculated

### Core Metrics
- **Total Distance**: Sum of all activity distances (km)
- **Total Activities**: Count of all activities
- **Active Days**: Unique days with at least one activity
- **Average Pace**: Total moving time ÷ total distance

### Performance
- **Longest Activity**: Activity with greatest distance
- **Fastest Activity**: Activity with lowest pace
- **Personal Records**: Best times for 5k, 10k, half marathon
- **Longest Streak**: Consecutive days with activity

### Breakdowns
- **Monthly Stats**: Distance per calendar month
- **Cumulative Distance**: Running total over time
- **Activity Types**: Group by activity type (Run, Ride, etc.)
- **Time of Day**: Activities by hour of day
- **Weekly Volume**: Distance by ISO week
- **Activity Frequency**: Count by month

### Achievements
- **Milestones**: Badges for distance thresholds (100km, 500km, etc.)

## ⚡ Performance

- **O(n) complexity** for all calculations
- **Single-pass aggregations** where possible
- **Memory efficient** with Map usage
- **Handles 10,000+ activities** without performance issues

## 🔧 Engineering Requirements

✅ **Pure Functions**: No side effects
✅ **Deterministic**: Same input = same output
✅ **No Database**: All in-memory calculations
✅ **No API Calls**: Pure data processing
✅ **TypeScript**: Full type safety
✅ **Single Export**: `buildYearSummary(activities)`

## 📝 Input Format

```typescript
interface Activity {
  id: number;
  type: string; // "Run", "Ride", "Walk", "Swim"
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  total_elevation_gain: number; // meters
  start_date: string; // ISO date
  start_date_local: string; // ISO date
}
```

## 📤 Output Format

Complete `YearSummary` object with all metrics calculated and formatted for frontend consumption.

## 🧪 Testing

Run the example to verify functionality:

```bash
npx ts-node metrics/example.ts
```

## 🔄 Integration

1. Import `buildYearSummary` in your API endpoint
2. Pass array of Strava activities
3. Return the YearSummary as JSON
4. Frontend consumes the structured data

All calculations are backend-only, keeping the frontend lightweight and focused on presentation.

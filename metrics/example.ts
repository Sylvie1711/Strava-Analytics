import { Activity } from './types';
import { buildYearSummary } from './index';

// Example usage with sample data
const sampleActivities: Activity[] = [
  {
    id: 123456789,
    type: "Run",
    distance: 5000, // 5km in meters
    moving_time: 1800, // 30 minutes in seconds
    elapsed_time: 1800,
    total_elevation_gain: 50,
    start_date: "2024-01-15T07:00:00Z",
    start_date_local: "2024-01-15T07:00:00Z"
  },
  {
    id: 123456790,
    type: "Run",
    distance: 10000, // 10km in meters
    moving_time: 3600, // 60 minutes in seconds
    elapsed_time: 3600,
    total_elevation_gain: 100,
    start_date: "2024-01-20T07:30:00Z",
    start_date_local: "2024-01-20T07:30:00Z"
  },
  {
    id: 123456791,
    type: "Ride",
    distance: 25000, // 25km in meters
    moving_time: 5400, // 90 minutes in seconds
    elapsed_time: 5400,
    total_elevation_gain: 300,
    start_date: "2024-02-01T14:00:00Z",
    start_date_local: "2024-02-01T14:00:00Z"
  }
];

// Build the year summary
const yearSummary = buildYearSummary(sampleActivities);

console.log('Year Summary:', JSON.stringify(yearSummary, null, 2));

// Expected output structure:
/*
{
  "total_distance": 40,
  "total_activities": 3,
  "active_days": 3,
  "longest_activity": {
    "distance": 25,
    "duration": 5400
  },
  "max_elevation_gain": 300,
  "monthly_stats": [
    { "month": "2024-01", "distance": 15 },
    { "month": "2024-02", "distance": 25 }
  ],
  "cumulative_distance": [
    { "date": "2024-01-15", "total": 5 },
    { "date": "2024-01-20", "total": 15 },
    { "date": "2024-02-01", "total": 40 }
  ],
  "activity_types": [
    { "type": "Ride", "count": 1, "distance": 25 },
    { "type": "Run", "count": 2, "distance": 15 }
  ],
  "time_of_day": [
    { "hour": 7, "count": 2 },
    { "hour": 14, "count": 1 },
    ... // hours 0-6, 8-13, 15-23 with count: 0
  ],
  "avg_pace": 270,
  "fastest_activity": {
    "pace": 360,
    "distance": 5
  },
  "longest_streak": 1,
  "weekly_volume": [
    { "week": "2024-W03", "distance": 15 },
    { "week": "2024-W05", "distance": 25 }
  ],
  "activity_frequency": [
    { "period": "2024-01", "count": 2 },
    { "period": "2024-02", "count": 1 }
  ],
  "milestones": [],
  "personal_records": [
    {
      "distance": "5 km",
      "time": "30:00",
      "pace": "6:00"
    },
    {
      "distance": "10 km", 
      "time": "60:00",
      "pace": "6:00"
    }
  ]
}
*/

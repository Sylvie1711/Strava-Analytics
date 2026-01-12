export interface Activity {
  id: number;
  type: string; // "Run", "Ride", "Walk", "Swim"
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  total_elevation_gain: number; // meters
  start_date: string; // ISO date
  start_date_local: string; // ISO date
}

export interface LongestActivity {
  distance: number; // km
  duration: number; // seconds
}

export interface FastestActivity {
  pace: number; // seconds per km
  distance: number; // km
}

export interface MonthlyStats {
  month: string;
  distance: number;
}

export interface CumulativeDistance {
  date: string;
  total: number;
}

export interface ActivityTypes {
  type: string;
  count: number;
  distance: number;
}

export interface TimeOfDay {
  hour: number;
  count: number;
}

export interface WeeklyVolume {
  week: string;
  distance: number;
}

export interface ActivityFrequency {
  period: string;
  count: number;
}

export interface PersonalRecord {
  distance: string;
  time: string;
  pace: string;
}

export interface YearSummary {
  total_distance: number; // km
  total_activities: number
  active_days: number
  
  longest_activity: LongestActivity
  max_elevation_gain: number // meters
  
  monthly_stats: MonthlyStats[]
  cumulative_distance: CumulativeDistance[]
  
  activity_types: ActivityTypes[]
  time_of_day: TimeOfDay[]
  
  avg_pace: number // seconds per km
  
  fastest_activity: FastestActivity
  
  longest_streak: number
  
  weekly_volume: WeeklyVolume[]
  activity_frequency: ActivityFrequency[]
  
  milestones: string[]
  
  personal_records: PersonalRecord[]
}

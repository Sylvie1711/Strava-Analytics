export interface YearSummary {
  total_distance: number; // km
  total_activities: number
  active_days: number
  
  longest_activity: {
    distance: number; // km
    duration: number; // seconds
  }
  max_elevation_gain: number // meters
  
  monthly_stats: { month: string, distance: number }[]
  cumulative_distance: { date: string, total: number }[]
  
  activity_types: { type: string, count: number, distance: number }[]
  time_of_day: { hour: number, count: number }[]
  
  avg_pace: number // seconds per km
  
  fastest_activity: {
    pace: number // seconds per km
    distance: number // km
  }
  
  longest_streak: number
  
  weekly_volume: { week: string, distance: number }[]
  activity_frequency: { period: string, count: number }[]
  
  milestones: string[]
  
  personal_records: {
    distance: string
    time: string
    pace: string
  }[]
}

export async function fetchStravaStats(stravaId: string): Promise<YearSummary> {
  try {
    const response = await fetch(`/api/me?stravaId=${stravaId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Strava stats:', error);
    throw error;
  }
}

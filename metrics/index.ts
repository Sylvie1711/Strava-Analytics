import { Activity, YearSummary } from './types';
import { calculateTotals } from './totals';
import { calculateLongestStreak } from './streaks';
import { calculatePersonalRecords } from './performance';
import { 
  calculateMonthlyStats, 
  calculateCumulativeDistance, 
  calculateActivityTypes, 
  calculateTimeOfDay, 
  calculateWeeklyVolume, 
  calculateActivityFrequency 
} from './breakdowns';
import { calculateMilestones } from './achievements';

/**
 * Main function to build a complete YearSummary from activities
 * @param activities - Array of Strava activities
 * @returns Complete YearSummary object
 */
export function buildYearSummary(activities: Activity[]): YearSummary {
  // Calculate all metrics
  const totals = calculateTotals(activities);
  const longestStreak = calculateLongestStreak(activities);
  const personalRecords = calculatePersonalRecords(activities);
  const monthlyStats = calculateMonthlyStats(activities);
  const cumulativeDistance = calculateCumulativeDistance(activities);
  const activityTypes = calculateActivityTypes(activities);
  const timeOfDay = calculateTimeOfDay(activities);
  const weeklyVolume = calculateWeeklyVolume(activities);
  const activityFrequency = calculateActivityFrequency(activities);
  const milestones = calculateMilestones(activities);

  // Combine all into YearSummary
  return {
    ...totals,
    longest_streak: longestStreak,
    monthly_stats: monthlyStats,
    cumulative_distance: cumulativeDistance,
    activity_types: activityTypes,
    time_of_day: timeOfDay,
    weekly_volume: weeklyVolume,
    activity_frequency: activityFrequency,
    milestones,
    personal_records: personalRecords
  };
}

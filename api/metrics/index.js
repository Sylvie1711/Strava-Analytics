import { YearSummary } from './types.js';
import { calculateTotals } from './totals.js';
import { calculateLongestStreak } from './streaks.js';
import { calculatePersonalRecords } from './performance.js';
import { 
  calculateMonthlyStats, 
  calculateCumulativeDistance, 
  calculateActivityTypes, 
  calculateTimeOfDay, 
  calculateWeeklyVolume, 
  calculateActivityFrequency 
} from './breakdowns.js';
import { calculateMilestones } from './achievements.js';

/**
 * Main function to build a complete YearSummary from activities
 * @param {Array} activities - Array of Strava activities
 * @returns {YearSummary} Complete YearSummary object
 */
export function buildYearSummary(activities) {
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
  return new YearSummary({
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
  });
}

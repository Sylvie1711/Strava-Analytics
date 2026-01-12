import { Activity } from './types';

export function calculateLongestStreak(activities: Activity[]): number {
  if (activities.length === 0) return 0;

  // Get unique active days sorted
  const activeDays = new Set<string>();
  for (const activity of activities) {
    const localDate = activity.start_date_local.split('T')[0];
    activeDays.add(localDate);
  }

  const sortedDays = Array.from(activeDays).sort();
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDays.length; i++) {
    const prevDate = new Date(sortedDays[i - 1]);
    const currDate = new Date(sortedDays[i]);
    
    // Calculate difference in days
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      // Consecutive day
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      // Break in streak
      currentStreak = 1;
    }
  }
  
  return longestStreak;
}

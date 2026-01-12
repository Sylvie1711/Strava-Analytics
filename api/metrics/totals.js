import { Activity } from './types.js';

export function calculateTotals(activities) {
  let totalDistance = 0;
  let totalMovingTime = 0;
  let maxElevationGain = 0;
  let longestActivity = { distance: 0, duration: 0 };
  let fastestActivity = { pace: Infinity, distance: 0 };
  const activeDays = new Set();

  for (const activity of activities) {
    // Convert distance to km
    const distanceKm = activity.distance / 1000;
    totalDistance += distanceKm;
    totalMovingTime += activity.moving_time;

    // Track max elevation
    if (activity.total_elevation_gain > maxElevationGain) {
      maxElevationGain = activity.total_elevation_gain;
    }

    // Track longest activity by distance
    if (distanceKm > longestActivity.distance) {
      longestActivity = {
        distance: distanceKm,
        duration: activity.moving_time
      };
    }

    // Track fastest activity (lowest pace)
    const pace = activity.moving_time / distanceKm;
    if (pace < fastestActivity.pace) {
      fastestActivity = {
        pace: pace,
        distance: distanceKm
      };
    }

    // Track active days (use local date)
    const localDate = activity.start_date_local.split('T')[0];
    activeDays.add(localDate);
  }

  const avgPace = totalDistance > 0 ? totalMovingTime / totalDistance : 0;

  return {
    total_distance: Math.round(totalDistance * 100) / 100, // Round to 2 decimal places
    total_activities: activities.length,
    active_days: activeDays.size,
    max_elevation_gain: maxElevationGain,
    longest_activity: longestActivity,
    fastest_activity: fastestActivity.pace === Infinity ? 
      { pace: 0, distance: 0 } : fastestActivity,
    avg_pace: Math.round(avgPace)
  };
}

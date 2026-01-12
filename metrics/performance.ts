import { Activity, PersonalRecord } from './types';

export function calculatePersonalRecords(activities: Activity[]): PersonalRecord[] {
  const targets = [
    { distance: 5, label: '5 km' },
    { distance: 10, label: '10 km' },
    { distance: 21.1, label: '21.1 km' }
  ];

  const records: PersonalRecord[] = [];

  for (const target of targets) {
    let bestTime = Infinity;
    let bestActivity: Activity | null = null;

    // Find activities with distance >= target
    for (const activity of activities) {
      const distanceKm = activity.distance / 1000;
      if (distanceKm >= target.distance && activity.moving_time < bestTime) {
        bestTime = activity.moving_time;
        bestActivity = activity;
      }
    }

    if (bestActivity) {
      const pace = bestActivity.moving_time / (bestActivity.distance / 1000);
      records.push({
        distance: target.label,
        time: formatTime(bestTime),
        pace: formatPace(pace)
      });
    }
  }

  return records;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60);
  const secs = Math.round(secondsPerKm % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

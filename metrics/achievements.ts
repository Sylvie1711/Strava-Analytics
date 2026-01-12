import { Activity } from './types';

export function calculateMilestones(activities: Activity[]): string[] {
  const milestones = [
    { distance: 100, badge: '100 km' },
    { distance: 500, badge: '500 km' },
    { distance: 1000, badge: '1000 km' },
    { distance: 2000, badge: '2000 km' }
  ];

  // Calculate total distance
  let totalDistance = 0;
  for (const activity of activities) {
    totalDistance += activity.distance / 1000; // Convert to km
  }

  // Return milestones that were reached
  return milestones
    .filter(milestone => totalDistance >= milestone.distance)
    .map(milestone => milestone.badge);
}

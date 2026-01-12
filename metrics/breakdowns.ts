import { Activity, MonthlyStats, CumulativeDistance, ActivityTypes, TimeOfDay, WeeklyVolume, ActivityFrequency } from './types';

export function calculateMonthlyStats(activities: Activity[]): MonthlyStats[] {
  const monthlyMap = new Map<string, number>();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const month = activity.start_date_local.substring(0, 7); // YYYY-MM
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + distanceKm);
  }

  return Array.from(monthlyMap.entries())
    .map(([month, distance]) => ({ month, distance: Math.round(distance * 100) / 100 }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateCumulativeDistance(activities: Activity[]): CumulativeDistance[] {
  // Sort activities by date
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(a.start_date_local).getTime() - new Date(b.start_date_local).getTime()
  );

  const cumulativeMap = new Map<string, number>();
  let runningTotal = 0;

  for (const activity of sortedActivities) {
    const distanceKm = activity.distance / 1000;
    runningTotal += distanceKm;
    const date = activity.start_date_local.split('T')[0];
    cumulativeMap.set(date, Math.round(runningTotal * 100) / 100);
  }

  return Array.from(cumulativeMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function calculateActivityTypes(activities: Activity[]): ActivityTypes[] {
  const typeMap = new Map<string, { count: number; distance: number }>();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const existing = typeMap.get(activity.type) || { count: 0, distance: 0 };
    typeMap.set(activity.type, {
      count: existing.count + 1,
      distance: existing.distance + distanceKm
    });
  }

  return Array.from(typeMap.entries())
    .map(([type, data]) => ({
      type,
      count: data.count,
      distance: Math.round(data.distance * 100) / 100
    }))
    .sort((a, b) => b.distance - a.distance);
}

export function calculateTimeOfDay(activities: Activity[]): TimeOfDay[] {
  const hourMap = new Map<number, number>();

  for (const activity of activities) {
    const hour = new Date(activity.start_date_local).getHours();
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  }

  const result: TimeOfDay[] = [];
  for (let hour = 0; hour < 24; hour++) {
    result.push({
      hour,
      count: hourMap.get(hour) || 0
    });
  }

  return result;
}

export function calculateWeeklyVolume(activities: Activity[]): WeeklyVolume[] {
  const weekMap = new Map<string, number>();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const date = new Date(activity.start_date_local);
    const weekNumber = getISOWeek(date);
    const year = date.getFullYear();
    const week = `${year}-W${weekNumber.toString().padStart(2, '0')}`;
    
    weekMap.set(week, (weekMap.get(week) || 0) + distanceKm);
  }

  return Array.from(weekMap.entries())
    .map(([week, distance]) => ({ week, distance: Math.round(distance * 100) / 100 }))
    .sort((a, b) => a.week.localeCompare(b.week));
}

export function calculateActivityFrequency(activities: Activity[]): ActivityFrequency[] {
  const monthlyMap = new Map<string, number>();

  for (const activity of activities) {
    const month = activity.start_date_local.substring(0, 7); // YYYY-MM
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);
  }

  return Array.from(monthlyMap.entries())
    .map(([period, count]) => ({ period, count }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

// Helper function to get ISO week number
function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

import { Activity, MonthlyStats, CumulativeDistance, ActivityTypes, TimeOfDay, WeeklyVolume, ActivityFrequency } from './types.js';

export function calculateMonthlyStats(activities) {
  const monthlyMap = new Map();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const month = activity.start_date_local.substring(0, 7); // YYYY-MM
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + distanceKm);
  }

  return Array.from(monthlyMap.entries())
    .map(([month, distance]) => new MonthlyStats({ month, distance: Math.round(distance * 100) / 100 }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateCumulativeDistance(activities) {
  // Sort activities by date
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(a.start_date_local).getTime() - new Date(b.start_date_local).getTime()
  );

  const cumulativeMap = new Map();
  let runningTotal = 0;

  for (const activity of sortedActivities) {
    const distanceKm = activity.distance / 1000;
    runningTotal += distanceKm;
    const date = activity.start_date_local.split('T')[0];
    cumulativeMap.set(date, Math.round(runningTotal * 100) / 100);
  }

  return Array.from(cumulativeMap.entries())
    .map(([date, total]) => new CumulativeDistance({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function calculateActivityTypes(activities) {
  const typeMap = new Map();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const existing = typeMap.get(activity.type) || { count: 0, distance: 0 };
    typeMap.set(activity.type, {
      count: existing.count + 1,
      distance: existing.distance + distanceKm
    });
  }

  return Array.from(typeMap.entries())
    .map(([type, data]) => new ActivityTypes({
      type,
      count: data.count,
      distance: Math.round(data.distance * 100) / 100
    }))
    .sort((a, b) => b.distance - a.distance);
}

export function calculateTimeOfDay(activities) {
  const hourMap = new Map();

  for (const activity of activities) {
    const hour = new Date(activity.start_date_local).getHours();
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  }

  const result = [];
  for (let hour = 0; hour < 24; hour++) {
    result.push(new TimeOfDay({
      hour,
      count: hourMap.get(hour) || 0
    }));
  }

  return result;
}

export function calculateWeeklyVolume(activities) {
  const weekMap = new Map();

  for (const activity of activities) {
    const distanceKm = activity.distance / 1000;
    const date = new Date(activity.start_date_local);
    const weekNumber = getISOWeek(date);
    const year = date.getFullYear();
    const week = `${year}-W${weekNumber.toString().padStart(2, '0')}`;
    
    weekMap.set(week, (weekMap.get(week) || 0) + distanceKm);
  }

  return Array.from(weekMap.entries())
    .map(([week, distance]) => new WeeklyVolume({ week, distance: Math.round(distance * 100) / 100 }))
    .sort((a, b) => a.week.localeCompare(b.week));
}

export function calculateActivityFrequency(activities) {
  const monthlyMap = new Map();

  for (const activity of activities) {
    const month = activity.start_date_local.substring(0, 7); // YYYY-MM
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);
  }

  return Array.from(monthlyMap.entries())
    .map(([period, count]) => new ActivityFrequency({ period, count }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

// Helper function to get ISO week number
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Activity interface - represents a Strava activity
export class Activity {
  constructor(data) {
    this.id = data.id;
    this.type = data.type; // "Run", "Ride", "Walk", "Swim"
    this.distance = data.distance; // meters
    this.moving_time = data.moving_time; // seconds
    this.elapsed_time = data.elapsed_time; // seconds
    this.total_elevation_gain = data.total_elevation_gain; // meters
    this.start_date = data.start_date; // ISO date
    this.start_date_local = data.start_date_local; // ISO date
  }
}

// LongestActivity interface
export class LongestActivity {
  constructor(data) {
    this.distance = data.distance; // km
    this.duration = data.duration; // seconds
  }
}

// FastestActivity interface
export class FastestActivity {
  constructor(data) {
    this.pace = data.pace; // seconds per km
    this.distance = data.distance; // km
  }
}

// MonthlyStats interface
export class MonthlyStats {
  constructor(data) {
    this.month = data.month;
    this.distance = data.distance;
  }
}

// CumulativeDistance interface
export class CumulativeDistance {
  constructor(data) {
    this.date = data.date;
    this.total = data.total;
  }
}

// ActivityTypes interface
export class ActivityTypes {
  constructor(data) {
    this.type = data.type;
    this.count = data.count;
    this.distance = data.distance;
  }
}

// TimeOfDay interface
export class TimeOfDay {
  constructor(data) {
    this.hour = data.hour;
    this.count = data.count;
  }
}

// WeeklyVolume interface
export class WeeklyVolume {
  constructor(data) {
    this.week = data.week;
    this.distance = data.distance;
  }
}

// ActivityFrequency interface
export class ActivityFrequency {
  constructor(data) {
    this.period = data.period;
    this.count = data.count;
  }
}

// PersonalRecord interface
export class PersonalRecord {
  constructor(data) {
    this.distance = data.distance;
    this.time = data.time;
    this.pace = data.pace;
  }
}

// YearSummary interface - main data structure
export class YearSummary {
  constructor(data) {
    this.total_distance = data.total_distance; // km
    this.total_activities = data.total_activities;
    this.active_days = data.active_days;
    
    this.longest_activity = data.longest_activity;
    this.max_elevation_gain = data.max_elevation_gain; // meters
    
    this.monthly_stats = data.monthly_stats || [];
    this.cumulative_distance = data.cumulative_distance || [];
    
    this.activity_types = data.activity_types || [];
    this.time_of_day = data.time_of_day || [];
    
    this.avg_pace = data.avg_pace; // seconds per km
    
    this.fastest_activity = data.fastest_activity;
    
    this.longest_streak = data.longest_streak;
    
    this.weekly_volume = data.weekly_volume || [];
    this.activity_frequency = data.activity_frequency || [];
    
    this.milestones = data.milestones || [];
    
    this.personal_records = data.personal_records || [];
  }
}

export interface StravaStats {
  runs: number;
  km: number;
}

export async function fetchStravaStats(stravaId: string): Promise<StravaStats> {
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

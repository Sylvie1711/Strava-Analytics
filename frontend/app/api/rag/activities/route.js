import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get('since');
  const stravaId = searchParams.get('stravaId');

  if (!stravaId) {
    return NextResponse.json({ error: "stravaId required" }, { status: 400 });
  }

  try {
    // Get user data first to find their database ID
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.VERCEL_URL || 'https://strava-hazel.vercel.app'
      : 'http://localhost:3001';
    
    // Get activities from Strava API
    const after = since ? Math.floor(new Date(since).getTime() / 1000) : 
                   Math.floor((Date.now() - 28 * 24 * 60 * 60 * 1000) / 1000); // 4 weeks ago

    const response = await fetch(`${baseUrl}/api/me?stravaId=${stravaId}&year=${new Date().getFullYear()}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch activities" }, 
        { status: response.status }
      );
    }
    
    const yearSummary = await response.json();
    
    // Extract activities from year summary (we'll need to modify the backend to return raw activities)
    // For now, let's create a simple mock response
    const activities = [
      {
        id: '12345',
        type: 'Run',
        distance: 5000,
        moving_time: 1800,
        start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '12346', 
        type: 'Run',
        distance: 7500,
        moving_time: 2700,
        start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json({ 
      activities,
      message: `Found ${activities.length} recent activities`
    });
    
  } catch (error) {
    console.error('Activities endpoint error:', error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

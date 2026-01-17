import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const stravaId = searchParams.get('stravaId');
  const year = searchParams.get('year');

  if (!stravaId) {
    return NextResponse.json({ error: "stravaId required" }, { status: 400 });
  }

  try {
    // Proxy to backend API which has real Strava data
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.VERCEL_URL || 'https://strava-hazel.vercel.app'
      : 'http://localhost:3001';
    
    const url = year ? `${baseUrl}/api/me?stravaId=${stravaId}&year=${year}` : `${baseUrl}/api/me?stravaId=${stravaId}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch user data" }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

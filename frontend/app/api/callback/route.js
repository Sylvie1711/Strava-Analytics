import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.VERCEL_URL || 'https://strava-hazel.vercel.app'
    : 'http://localhost:3000';

  if (error) {
    return NextResponse.redirect(`${baseUrl}?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}?error=no_code`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.redirect(`${baseUrl}?error=${tokenData.error}`);
    }

    // Get athlete info
    const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const athlete = await athleteResponse.json();

    // Store user in backend database
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? process.env.VERCEL_URL || 'https://strava-hazel.vercel.app'
      : 'http://localhost:3001';

    await fetch(`${backendUrl}/api/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        athlete,
        tokenData
      })
    });

    // Redirect to frontend with stravaId
    const redirectUrl = `${baseUrl}?stravaId=${athlete.id}`;
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${baseUrl}?error=callback_failed`);
  }
}

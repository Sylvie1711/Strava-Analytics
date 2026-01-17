import { redirect } from 'next/navigation';

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;

  if (!clientId) {
    return Response.json({ error: "Strava client ID not configured" }, { status: 500 });
  }

  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.VERCEL_URL || 'https://strava-hazel.vercel.app'
    : 'http://localhost:3000';

  const redirectUrl =
    "https://www.strava.com/oauth/authorize" +
    `?client_id=${clientId}` +
    "&response_type=code" +
    `&redirect_uri=${baseUrl}/api/callback` +
    "&approval_prompt=force" +
    "&scope=read,activity:read_all";

  return redirect(redirectUrl);
}

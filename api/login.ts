export default function handler(req: any, res: any) {
  const clientId = process.env.STRAVA_CLIENT_ID;

  const redirect =
    "https://www.strava.com/oauth/authorize" +
    `?client_id=${clientId}` +
    "&response_type=code" +
    "&redirect_uri=https://strava-hazel.vercel.app/api/callback" +
    "&approval_prompt=force" +
    "&scope=read,activity:read_all";

  res.writeHead(302, { Location: redirect });
  res.end();
}


export default function handler(req, res) {
  const clientId = process.env.STRAVA_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: "Strava client ID not configured" });
  }

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

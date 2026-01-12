import { db } from "./db.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";

export default async function handler(req: any, res: any) {
  const code = req.query.code;

  // Exchange code for token
  const tokenRes = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code"
    })
  });

  const data = await tokenRes.json();

  const stravaId = data.athlete.id.toString();

  // Check if user exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.stravaId, stravaId));

  if (existing.length === 0) {
    // Insert new user
    await db.insert(users).values({
      stravaId,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at
    });
  } else {
    // Update tokens
    await db
      .update(users)
      .set({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at
      })
      .where(eq(users.stravaId, stravaId));
  }

  res.redirect(`/?stravaId=${stravaId}`);
}

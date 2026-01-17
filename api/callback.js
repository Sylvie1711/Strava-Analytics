import { db } from "./db.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";


export default async function handler(req, res) {
  try {
    let athlete, tokenData;

    if (req.method === 'POST') {
      // Handle POST request from frontend
      const body = req.body;
      athlete = body.athlete;
      tokenData = body.tokenData;
    } else {
      // Handle GET request (original OAuth flow - not used anymore)
      const code = req.query.code;

      if (!code) {
        return res.status(400).json({ error: "Missing authorization code" });
      }

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

      if (!tokenRes.ok) {
        return res.status(500).json({ error: "Failed to exchange authorization code" });
      }

      tokenData = await tokenRes.json();
      athlete = tokenData.athlete;
    }

    if (!tokenData?.access_token || !athlete?.id) {
      return res.status(500).json({ error: "Invalid response from Strava" });
    }

    const stravaId = athlete.id.toString();

    try {
      // Check if user exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.stravaId, stravaId));

      if (existing.length === 0) {
        // Insert new user
        await db.insert(users).values({
          stravaId,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: tokenData.expires_at
        });
      } else {
        // Update tokens
        await db
          .update(users)
          .set({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            expiresAt: tokenData.expires_at
          })
          .where(eq(users.stravaId, stravaId));
      }

      if (req.method === 'POST') {
        res.json({ success: true, stravaId });
      } else {
        res.redirect(`/?stravaId=${stravaId}`);
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Database operation failed" });
    }
  } catch (error) {
    console.error("Callback error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

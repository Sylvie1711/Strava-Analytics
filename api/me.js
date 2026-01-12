import { db } from "./db.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";
import { buildYearSummary } from "../metrics/index.js";

export default async function handler(req, res) {
  const stravaId = req.query.stravaId;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.stravaId, stravaId));

  if (result.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = result[0];

  const after = Math.floor(
    new Date(new Date().getFullYear(), 0, 1).getTime() / 1000
  );

  let page = 1;
  const activities = [];

  while (true) {
    const r = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) break;

    // Transform Strava data to our Activity interface
    for (const a of data) {
      activities.push({
        id: a.id,
        type: a.type,
        distance: a.distance || 0,
        moving_time: a.moving_time || 0,
        elapsed_time: a.elapsed_time || 0,
        total_elevation_gain: a.total_elevation_gain || 0,
        start_date: a.start_date,
        start_date_local: a.start_date_local
      });
    }

    page++;
  }

  // Build comprehensive year summary
  const yearSummary = buildYearSummary(activities);

  res.json(yearSummary);
}
import { db } from "./db.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";

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
let totalDistance = 0;
let totalRuns = 0;

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

  for (const a of data) {
    if (a.type && a.type.toLowerCase().includes("run")) {
      totalRuns++;
      totalDistance += a.distance;
    }
  }

  page++;
}


  res.json({
    runs: totalRuns,
    km: (totalDistance / 1000).toFixed(1),
  });
}
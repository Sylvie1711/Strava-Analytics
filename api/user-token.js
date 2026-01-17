import { db } from "./db.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  const stravaId = req.query.stravaId;
  
  if (!stravaId) {
    return res.status(400).json({ error: "Missing stravaId parameter" });
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.stravaId, stravaId));

  if (result.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = result[0];
  
  res.json({
    stravaId: user.stravaId,
    accessToken: user.accessToken
  });
}

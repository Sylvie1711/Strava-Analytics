import { pgTable, serial, text, bigint, timestamp, integer, real } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  stravaId: text("strava_id").unique(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: bigint("expires_at", { mode: "number" })
});

export const activityEmbeddings = pgTable("activity_embeddings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  activityId: integer("activity_id"),
  content: text("content"),
  embedding: text("embedding"), // Store as text for now
  createdAt: timestamp("created_at").defaultNow()
});

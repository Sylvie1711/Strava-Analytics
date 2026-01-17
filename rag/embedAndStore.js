// lib/rag/embedAndStore.js

import { buildEmbeddingText } from "./buildEmbeddingText.js";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/feature-extraction`;

export async function embedAndStoreActivity({
  userId,
  activityId,
  activity,
}) {
  // 1️⃣ Build embedding text
  const content = buildEmbeddingText(activity);

  // 2️⃣ Call HuggingFace embeddings API
  const response = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: content }),
  });

  const data = await response.json();
  
  // HF returns: {0: 0.1, 1: 0.2, 2: 0.3, ...} object with 384 dimensions
  const vector = Object.values(data);
  
  // Convert to pgvector format: [0.1,0.2,0.3,...]
  const vectorString = `[${vector.join(',')}]`;

  // 3️⃣ Store in Postgres
  await pool.query(
    `
    INSERT INTO activity_embeddings
      (user_id, activity_id, content, embedding)
    VALUES ($1, $2, $3, $4)
    `,
    [userId, activityId, content, vectorString]
  );
}

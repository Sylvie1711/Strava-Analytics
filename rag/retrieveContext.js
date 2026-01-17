// lib/rag/retrieveContext.js

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/feature-extraction`;

export async function retrieveContext({
  userId,
  question,
  limit = 5,
}) {
  // 1️⃣ Embed user question
  const response = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: question }),
  });

  const data = await response.json();
  
  // HF returns: {0: 0.1, 1: 0.2, 2: 0.3, ...} object with 384 dimensions
  const queryVector = Object.values(data);
  
  // Convert to pgvector format: [0.1,0.2,0.3,...]
  const vectorString = `[${queryVector.join(',')}]`;

  // 2️⃣ Vector similarity search (user-scoped)
  const { rows } = await pool.query(
    `
    SELECT content
    FROM activity_embeddings
    WHERE user_id = $1
    ORDER BY embedding <-> $2
    LIMIT $3
    `,
    [userId, vectorString, limit]
  );

  // 3️⃣ Return plain text snippets
  return rows.map((r) => r.content);
}

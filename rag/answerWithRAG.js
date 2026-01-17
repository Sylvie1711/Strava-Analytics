// lib/rag/answerWithRAG.js

import { retrieveContext } from "./retrieveContext.js";

export async function answerWithRAG({
  userId,
  question,
}) {
  // 1️⃣ Retrieve relevant activity context
  const contextChunks = await retrieveContext({
    userId,
    question,
    limit: 5,
  });

  const contextText =
    contextChunks.length > 0
      ? contextChunks.join("\n\n")
      : "No relevant past activities found.";

  // 2️⃣ Build final prompt
  const prompt = `
You are a running coach AI.
Use ONLY the user's past activity context to answer.
If context is insufficient, say so clearly.

User question:
${question}

Relevant past activities:
${contextText}

Give practical, actionable advice.
`.trim();

  // 3️⃣ Call Groq LLM
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq LLM failed: ${err}`);
  }

  const data = await response.json();

  return data.choices[0].message.content;
}

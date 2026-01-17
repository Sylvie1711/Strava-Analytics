import { answerWithRAG } from '../../rag/answerWithRAG.js';
import { embedAndStoreActivity } from '../../rag/embedAndStore.js';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    // Chat endpoint - ask questions about your activities
    const { userId, question } = req.body;
    
    if (!userId || !question) {
      return res.status(400).json({ error: "userId and question required" });
    }

    try {
      const answer = await answerWithRAG({ userId, question });
      res.json({ answer });
    } catch (error) {
      console.error('RAG chat error:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (method === 'PUT') {
    // Store endpoint - embed and store activities
    const { userId, activityId, activity } = req.body;
    
    if (!userId || !activityId || !activity) {
      return res.status(400).json({ error: "userId, activityId, and activity required" });
    }

    try {
      await embedAndStoreActivity({ userId, activityId, activity });
      res.json({ success: true });
    } catch (error) {
      console.error('RAG store error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

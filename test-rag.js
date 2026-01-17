import { config } from 'dotenv';
import { embedAndStoreActivity } from './rag/embedAndStore.js';
import { answerWithRAG } from './rag/answerWithRAG.js';

// Load environment variables
config();

// Debug: Check if DATABASE_URL is loaded
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded successfully' : 'Not loaded');

async function testRAG() {
  console.log('🧪 Testing RAG Implementation...\n');

  // Test data - sample activity
  const testActivity = {
    type: "Run",
    distance_km: 10.5,
    avg_pace_sec: 360, // 6:00 min/km
    avg_hr: 165,
    elevation_gain: 120,
    perceived_exertion: 7
  };

  try {
    // 1️⃣ Test embedding and storing
    console.log('📝 Embedding and storing activity...');
    await embedAndStoreActivity({
      userId: 1,
      activityId: 12345,
      activity: testActivity
    });
    console.log('✅ Activity embedded and stored successfully\n');

    // 2️⃣ Test retrieval and answering
    console.log('🤖 Testing RAG question answering...');
    const answer = await answerWithRAG({
      userId: 1,
      question: "How was my pace on hilly routes?"
    });
    console.log('✅ RAG Answer:', answer);

  } catch (error) {
    console.error('❌ RAG Test Failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testRAG();

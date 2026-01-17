import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_eqKmp2szCwW0@ep-soft-snow-aha7iexa-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

async function setupRAGSchema() {
  console.log('🔧 Setting up RAG database schema...');
  
  try {
    // Enable pgvector extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log('✅ pgvector extension enabled');

    // Create activity_embeddings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activity_embeddings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        activity_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        embedding vector(384) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ activity_embeddings table created');

    // Create index for faster similarity search
    await pool.query(`
      CREATE INDEX IF NOT EXISTS activity_embeddings_embedding_idx 
      ON activity_embeddings 
      USING ivfflat (embedding vector_cosine_ops);
    `);
    console.log('✅ vector index created');

    console.log('\n🎉 RAG schema setup complete!');
    
  } catch (error) {
    console.error('❌ Schema setup failed:', error);
  } finally {
    await pool.end();
  }
}

setupRAGSchema();

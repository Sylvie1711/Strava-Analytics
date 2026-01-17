import { NextResponse } from 'next/server';

// Helper function to derive insights from activities
function deriveInsights(activities) {
  if (!activities || activities.length === 0) {
    return {
      weeklyVolume: 'Low',
      paceConsistency: 'Low', 
      fatigueRisk: 'Low',
      confidence: 'Low'
    };
  }

  // Weekly volume trend (simple calculation)
  const recentWeeks = activities.slice(0, 2); // Last 2 activities as proxy
  const olderWeeks = activities.slice(2, 4);
  
  const recentVolume = recentWeeks.reduce((sum, a) => sum + a.distance, 0);
  const olderVolume = olderWeeks.reduce((sum, a) => sum + a.distance, 0);
  
  const weeklyVolume = recentVolume > olderVolume * 1.1 ? 'Increasing' : 
                      recentVolume < olderVolume * 0.9 ? 'Decreasing' : 'Flat';

  // Pace consistency (simple variance calculation)
  const paces = activities.map(a => (a.moving_time / a.distance) * 60 * 60); // seconds/km
  const avgPace = paces.reduce((sum, p) => sum + p, 0) / paces.length;
  const variance = paces.reduce((sum, p) => sum + Math.pow(p - avgPace, 2), 0) / paces.length;
  const paceConsistency = variance < 30 ? 'High' : variance < 60 ? 'Medium' : 'Low';

  // Fatigue risk (based on volume and frequency)
  const totalVolume = activities.reduce((sum, a) => sum + a.distance, 0);
  const fatigueRisk = totalVolume > 30000 ? 'High' : totalVolume > 15000 ? 'Medium' : 'Low';

  // Overall confidence based on data quality
  const confidence = activities.length >= 4 ? 'High' : activities.length >= 2 ? 'Medium' : 'Low';

  return { weeklyVolume, paceConsistency, fatigueRisk, confidence };
}

// Helper function to convert raw pace to qualitative label
function paceToLabel(secondsPerKm) {
  if (secondsPerKm < 300) return 'very fast';
  if (secondsPerKm < 360) return 'fast';
  if (secondsPerKm < 420) return 'moderate';
  if (secondsPerKm < 480) return 'easy';
  return 'very easy';
}

// Helper function to format date as DD-MM-YY
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export async function POST(request) {
  try {
    const { question, stravaId } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    if (!stravaId) {
      return NextResponse.json({ error: "stravaId is required" }, { status: 400 });
    }

    // Fetch real Strava data from backend
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://strava-hazel.vercel.app'  // Production Vercel URL
      : 'http://localhost:3001';

    // Get user data to fetch raw activities
    const userResponse = await fetch(`${baseUrl}/api/me?stravaId=${stravaId}&year=${new Date().getFullYear()}`);
    
    if (!userResponse.ok) {
      const errorData = await userResponse.json().catch(() => ({}));
      return NextResponse.json({ error: errorData.error || "Failed to fetch Strava data" }, { status: userResponse.status });
    }
    
    // Get user tokens from database - we need to create a user endpoint or modify existing one
    // For now, let's fetch activities directly using the user's access token from the me endpoint
    // We'll need to modify the backend to return the access token or create a separate endpoint
    
    // Temporary solution: fetch activities using the summary data structure
    const yearSummary = await userResponse.json();
    
    // The backend summary doesn't include raw activities, so we need to fetch them directly
    // Let's create a simple endpoint to get user tokens first
    
    // For now, let's make a direct call to get user data and then fetch activities
    const tokenResponse = await fetch(`${baseUrl}/api/user-token?stravaId=${stravaId}`);
    
    if (!tokenResponse.ok) {
      // If no token endpoint, we'll need to create one or modify existing approach
      return NextResponse.json({ 
        error: "User token endpoint not available. Please set up proper token access." 
      }, { status: 500 });
    }
    
    const { accessToken } = await tokenResponse.json();
    
    if (!accessToken) {
      return NextResponse.json({ 
        error: "No access token found. Please reconnect your Strava account." 
      }, { status: 401 });
    }
    
    // Fetch raw activities from Strava API (last 8 weeks)
    const eightWeeksAgo = Math.floor((Date.now() - 8 * 7 * 24 * 60 * 60 * 1000) / 1000);
    let page = 1;
    const allActivities = [];

    while (true) {
      const activitiesResponse = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${eightWeeksAgo}&per_page=200&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const activitiesData = await activitiesResponse.json();

      if (!Array.isArray(activitiesData) || activitiesData.length === 0) break;

      allActivities.push(...activitiesData);
      console.log(`Fetched ${activitiesData.length} activities, total: ${allActivities.length}`);
      page++;
    }

    console.log(`Total activities fetched: ${allActivities.length}`);
    if (allActivities.length > 0) {
      console.log('Sample activity:', allActivities[0]);
    }

    if (allActivities.length === 0) {
      return NextResponse.json({ 
        error: "No activities found in the last 8 weeks. Please ensure you have recent Strava activities." 
      }, { status: 404 });
    }

    // Build context sections with sanitized data - recent 3 activities
    const recentActivitiesContext = allActivities.slice(0, 3).map((activity, index) => {
      const paceSeconds = (activity.moving_time / activity.distance) * 60 * 60;
      return `
Activity ${index + 1}:
- Type: ${activity.type}
- Distance: ${(activity.distance / 1000).toFixed(1)} km
- Duration: ${Math.floor(activity.moving_time / 60)} minutes
- Pace: ${paceToLabel(paceSeconds)} pace
- Date: ${formatDate(activity.start_date)}
    `;
    }).join('\n');

    // Include 1-2 similar activities for better context
    const similarActivitiesContext = allActivities.slice(3, 5).map((activity, index) => {
      const paceSeconds = (activity.moving_time / activity.distance) * 60 * 60;
      return `
Similar Activity ${index + 1}:
- Type: ${activity.type}
- Distance: ${(activity.distance / 1000).toFixed(1)} km
- Duration: ${Math.floor(activity.moving_time / 60)} minutes
- Pace: ${paceToLabel(paceSeconds)} pace
- Date: ${formatDate(activity.start_date)}
    `;
    }).join('\n');

    // Derive insights from real data
    const insights = deriveInsights(allActivities);

    console.log('Context being sent to AI:');
    console.log('Recent activities context:', recentActivitiesContext);
    console.log('Similar activities context:', similarActivitiesContext);

    // Enhanced coaching prompt with new behaviors
    const prompt = `SYSTEM RULES (STRICT):
- Answer ONLY running-related questions (training, pacing, recovery, performance, nutrition, injury prevention)
- Politely refuse non-running questions with: "I specialize in running coaching. How can I help with your training?"
- NEVER convert units unless explicitly asked
- Assume user understands running metrics (pace, distance, heart rate)
- NEVER invent user-specific data, trends, or progress not in context
- NEVER summarize workouts unless explicitly asked
- If context insufficient, state assumptions and answer with general knowledge
- No medical advice
- Do NOT make comparative claims (better, worse, consistent, fastest, second best) unless explicitly supported by context
- Do NOT invent trends, rankings, or performance labels
- Do NOT repeat raw numeric metrics unless explicitly requested
- Always format dates as DD-MM-YY
- NEVER invent dates not provided in context

COACHING BEHAVIOR:
- Concise, direct, practical (6-8 sentences max)
- Use bullet points for advice (2-3 actions max)
- No blog-style writing or motivational fluff
- No generic analysis sections
- No unit conversions or explanations
- Answer directly, no filler phrases
- If relative performance is unclear, say so clearly
- ONLY use dates and data provided in the context below

REQUIRED ELEMENTS:
1) End with: Confidence: High/Medium/Low
2) If giving advice, mention one trade-off or risk
3) Ask at most ONE follow-up question if it would improve advice
4) If recommending change, state what happens if user keeps doing same thing

TONE: Calm, confident, coach-like, human

DERIVED INSIGHTS:
- Weekly volume trend: ${insights.weeklyVolume}
- Pace consistency: ${insights.paceConsistency}
- Fatigue risk: ${insights.fatigueRisk}

RECENT ACTIVITIES (last 8 weeks):
${recentActivitiesContext}

SIMILAR PAST ACTIVITIES (last 8 weeks):
${similarActivitiesContext}

USER QUESTION: ${question}

IMPORTANT: Only use the activity data provided above. Do not invent any dates, distances, or other metrics.

Answer directly following all rules above.`;

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3, // Low temperature for consistent coaching
        max_tokens: 300, // Strict limit for concise responses
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API failed: ${error}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('RAG chat error:', error);
    return NextResponse.json(
      { error: "Failed to get AI response" }, 
      { status: 500 }
    );
  }
}

// lib/rag/buildEmbeddingText.js

/**
 * Builds a deterministic, human-readable text representation
 * of an activity for embedding.
 */
export function buildEmbeddingText(activity) {
  const paceBehavior = getPaceBehavior(activity);
  const notes = getAutoNotes(activity);

  return `
Activity type: ${activity.type}
Distance: ${activity.distance_km} km
Average pace: ${activity.avg_pace_sec} seconds per km
Heart rate: ${activity.avg_hr ?? "not available"}
Elevation gain: ${activity.elevation_gain ?? 0} meters
Effort: ${activity.perceived_exertion ?? "unknown"}
Pace behavior: ${paceBehavior}
Notes: ${notes}
`.trim();
}

function getPaceBehavior(activity) {
  // Placeholder logic — refine later when splits are available
  if (activity.avg_pace_sec > 360) {
    return "slowed near end";
  }
  return "steady pace";
}

function getAutoNotes(activity) {
  if (activity.elevation_gain && activity.elevation_gain > 100) {
    return "Hilly route";
  }

  if (activity.avg_hr && activity.avg_hr > 165) {
    return "Heart rate was elevated";
  }

  return "Normal effort run";
}

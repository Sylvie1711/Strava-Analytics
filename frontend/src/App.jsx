import { useEffect, useState } from "react";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const stravaId = params.get("stravaId");

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!stravaId) return;

    fetch(`/api/me?stravaId=${stravaId}`)
      .then((r) => r.json())
      .then(setStats);
  }, [stravaId]);

  if (!stravaId) return <h1>Missing Strava ID</h1>;
  if (!stats) return <h1>Loading your Strava stats…</h1>;

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🏃 Your 2026 Running Year</h1>
      <p>Runs: {stats.runs}</p>
      <p>Total Distance: {stats.km} km</p>
    </div>
  );
}

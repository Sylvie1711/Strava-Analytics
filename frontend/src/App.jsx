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

  if (!stravaId) return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🏃 Strava Year Review</h1>
      <p>Connect your Strava account to see your 2026 running stats!</p>
      <button 
        onClick={() => window.location.href = "/api/login"}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#FC4C02",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Connect with Strava
      </button>
    </div>
  );
  if (!stats) return <h1>Loading your Strava stats…</h1>;

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🏃 Your 2026 Running Year</h1>
      <p>Runs: {stats.runs}</p>
      <p>Total Distance: {stats.km} km</p>
    </div>
  );
}

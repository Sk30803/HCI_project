import React, { useEffect, useState } from "react";

/*
DriverMapPreview
- small map preview with a simulated driver marker moving toward pickup
- shows a driver card with Call button
- clicking Expand opens a larger map (new tab)
*/

const DriverMapPreview = ({ pickup = "", dropoff = "", vehicle = "Car", remainingSec = 120, onCall }) => {
  const total = Math.max(remainingSec, 10);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // update progress proportionally to elapsed time
    const id = setInterval(() => {
      setProgress((p) => {
        const newP = Math.min(1 - remainingSec / total + (p * 0.01), 1);
        return Math.min(Math.max(newP, p), 1);
      });
    }, 800);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [remainingSec]);

  const openFullMap = () => {
    window.open("https://www.openstreetmap.org/#map=13/24.860/67.001", "_blank");
  };

  // left position for simulated driver on preview (5%..95%)
  const leftPct = Math.max(6, Math.min(94, 6 + progress * 88));

  // driver details (simulate)
  const driver = { name: vehicle + " • Plate", etaSec: remainingSec };

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #dde1ea", background: "#fff" }}>
      <div style={{ position: "relative", height: 180, background: "#eef2f5" }}>
        {/* replace src with your map image if you have one */}
        <img src="/map_image.png" alt="map" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

        {/* route line (decorative) */}
        <svg style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, pointerEvents: "none" }}>
          <polyline
            points="8%,75% 30%,62% 55%,52% 85%,42%"
            fill="none"
            stroke="#0f9d58"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
            opacity="0.95"
          />
        </svg>

        {/* driver marker */}
        <div style={{
          position: "absolute",
          top: "45%",
          left: `${leftPct}%`,
          transform: "translate(-50%,-50%)",
          background: "#0f9d58",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 8,
          fontWeight: 700,
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)"
        }}>
          🚗 {vehicle}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 18 }}>👤</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{driver.name}</div>
            <div style={{ fontSize: 12, color: "#6b7180" }}>{Math.ceil(remainingSec / 60)} min away</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => onCall && onCall()} style={{ padding: "8px 10px", borderRadius: 999, border: "1px solid #dde1ea", background: "#fff" }}>
            Call
          </button>

          <button onClick={openFullMap} style={{ padding: "8px 12px", borderRadius: 999, border: "none", background: "#0f9d58", color: "#fff" }}>
            Expand map
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverMapPreview;

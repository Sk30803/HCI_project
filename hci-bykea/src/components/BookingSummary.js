import React, { useEffect, useState } from "react";
import DriverMapPreview from "./DriverMapPreview";

const BookingSummary = ({ pickup, dropoff, vehicle, fare, acceptedOffer, onCancel, onShare, onCall }) => {
  const initialMinutes =
    acceptedOffer && acceptedOffer.eta
      ? Number(String(acceptedOffer.eta).replace(/\D/g, "")) || 0
      : 0;
  const [remainingSec, setRemainingSec] = useState(initialMinutes * 60);
  const [showMapPreview, setShowMapPreview] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setRemainingSec((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => setRemainingSec(initialMinutes * 60), [acceptedOffer]); // reset on change

  const prettyEta = () => {
    if (remainingSec <= 0) return "Arriving";
    if (remainingSec < 60) return `${remainingSec}s`;
    return `${Math.ceil(remainingSec / 60)} min`;
  };

  return (
    <div className="ride-screen">
      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">Ride summary</span>
        <h1 className="ride-title">Booking confirmed</h1>
      </section>

      <section className="ride-section summary-card">
        <p className="summary-title">Trip details</p>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <div>
            <div className="summary-label">Pick-up</div>
            <div className="summary-value">{pickup}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="summary-label">Fare</div>
            <div className="summary-value">Rs {fare}</div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="summary-label">Drop-off</div>
          <div className="summary-value">{dropoff}</div>
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="summary-label">Vehicle</div>
            <div className="summary-value">{acceptedOffer ? acceptedOffer.car : vehicle}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="summary-label">ETA</div>
            <div className="summary-value">{prettyEta()}</div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button
            className="pickup-row"
            onClick={() => setShowMapPreview((v) => !v)}
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ width: 36, height: 36, borderRadius: 8, background: "#eef2f5", display: "flex", alignItems: "center", justifyContent: "center" }}>🗺️</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>{showMapPreview ? "Hide map preview" : "Track your driver"}</div>
                <div style={{ fontSize: 12, color: "#6b7180" }}>{showMapPreview ? "Tap to expand" : "Tap to view small preview"}</div>
              </div>
            </div>
            <div style={{ color: "#0f9d58", fontWeight: 700 }}>Open</div>
          </button>

          {showMapPreview && (
            <div style={{ marginTop: 10 }}>
              <DriverMapPreview
                pickup={pickup}
                dropoff={dropoff}
                vehicle={acceptedOffer ? acceptedOffer.car : vehicle}
                remainingSec={remainingSec}
                onCall={() => onCall && onCall(acceptedOffer)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Cancel (red) full width */}
      <section className="ride-section" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="cancel-btn"
          onClick={onCancel}
          style={{ width: "100%" }}
        >
          Cancel ride
        </button>

        {/* Share below cancel */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="ride-primary-btn"
            onClick={onShare}
            style={{ width: 140, borderRadius: 999 }}
          >
            Share
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookingSummary;

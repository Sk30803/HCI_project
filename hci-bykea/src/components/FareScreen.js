import React, { useState } from "react";

const FareScreen = ({ selectedVehicle, onBack, onConfirmFare }) => {
  const baseFares = {
    bike: 180,
    rickshaw: 260,
    car: 420,
    "ac-car": 480,
  };

  const minFare = baseFares[selectedVehicle] || 0;

  const [fare, setFare] = useState(minFare);
  const [payment, setPayment] = useState("cash");

  return (
    <div className="fare-screen">

      {/* Back */}
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">Go back</span>
        </button>
      </div>

      {/* Header */}
      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">Book a ride</span>
        <h1 className="ride-title">Step 3 · Choose fare</h1>
      </section>

      {/* Vehicle summary */}
      <section className="ride-section summary-card">
        <p className="summary-title">Selected vehicle</p>
        <div className="summary-row" style={{ padding: "4px 0" }}>
          <span className="summary-value" style={{ fontWeight: 600 }}>
            {selectedVehicle.replace("-", " ").toUpperCase()}
          </span>
          <span className="summary-edit">Min Rs {minFare}</span>
        </div>
      </section>

      {/* Fare slider + manual input */}
      <section className="ride-section">
        <h2 className="section-heading">Set your fare</h2>

        <input
          type="range"
          min={minFare}
          max={minFare + 200}
          value={fare}
          onChange={(e) => setFare(Number(e.target.value))}
          style={{ width: "100%" }}
        />

        <div style={{ marginTop: 10, fontSize: 16, fontWeight: 600 }}>
          Rs {fare}
        </div>

        {/* Manual number input */}
        <input
          type="number"
          className="pickup-search"
          style={{ marginTop: 10 }}
          value={fare}
          min={minFare}
          max={minFare + 200}
          onChange={(e) => setFare(Number(e.target.value))}
        />

        <p style={{ fontSize: 12, color: "#6b7180", marginTop: 6 }}>
          You can offer more to get a faster match.
        </p>
      </section>

      {/* Payment dropdown */}
      <section className="ride-section">
        <h2 className="section-heading">Payment method</h2>

        <select
          className="pickup-search"
          style={{ padding: "10px 12px" }}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cash">Cash (pay to driver)</option>
          <option value="jazzcash">jazzcash</option>
          <option value="wallet">Bykea Wallet</option>
        </select>
      </section>

      {/* Continue */}
      <section className="ride-section ride-footer-single">
        <button
          className="ride-primary-btn"
          onClick={() => onConfirmFare(fare, payment)}
        >
          Continue
        </button>
      </section>
    </div>
  );
};

export default FareScreen;

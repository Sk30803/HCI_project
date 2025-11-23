import React from "react";

const VehicleScreen = ({ selectedVehicle, onBack, onSelectVehicle, onContinue }) => {
  const vehicles = [
    { id: "bike", label: "Bike", detail: "1 seat • Low cost", price: "Rs 180", eta: "3 min" },
    { id: "rickshaw", label: "Rickshaw", detail: "2–3 seats • Covered", price: "Rs 260", eta: "5 min" },
    { id: "car", label: "Car", detail: "4 seats • Comfort", price: "Rs 420", eta: "7 min" },
    { id: "ac-car", label: "AC Car", detail: "4 seats • A/C", price: "Rs 480", eta: "8 min" },
  ];

  return (
    <div className="vehicle-screen">
      {/* back chip, same pattern as RideScreen */}
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">Go back</span>
        </button>
      </div>

      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">Book a ride</span>
        <h1 className="ride-title">Step 2 · Choose vehicle</h1>
      </section>

      <section className="ride-section">

        <div className="vehicle-list">
          {vehicles.map((v) => (
            <button
              key={v.id}
              className={
                "vehicle-card vehicle-card-large " +
                (selectedVehicle === v.id ? "vehicle-card--selected" : "")
              }
              onClick={() => onSelectVehicle(v.id)}
            >
              <div className="vehicle-main">
                <span className="vehicle-name">{v.label}</span>
                <span className="vehicle-time">{v.eta} away</span>
              </div>
              <div className="vehicle-meta">
                <span className="vehicle-capacity">{v.detail}</span>
                <span className="vehicle-price">{v.price} </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="ride-section ride-footer-single">
        <button className="ride-primary-btn" onClick={onContinue}>
          Continue
        </button>
      </section>
    </div>
  );
};

export default VehicleScreen;

import React, { useState } from "react";

const RideScreen = ({ onBack, onEditPickup, onEditDropoff, pickupLocation, dropoffLocation,onContinue }) => {
  const [selectedVehicle, setSelectedVehicle] = useState("bike");

  return (
    <div className="ride-screen">
      <div className="ride-back-row">
  <button
    className="back-chip"
    onClick={onBack}
    aria-label="Go back to previous screen"
  >
    <span className="back-arrow">⟵</span>
    <span className="back-text">Go back</span>
  </button>
</div>

<section className="ride-section ride-header-card">
  <span className="ride-flow-label">Book a ride</span>
  <h1 className="ride-title">Step 1 · Choose locations</h1>
</section>

      <section className="ride-section summary-card">
  <p className="summary-title">Your trip</p>

  <button className="summary-row" onClick={onEditPickup}>
    <span className="summary-dot pickup-dot" />
    <div className="summary-texts">
      <span className="summary-label">Pick-up</span>
      <span className="summary-value">{pickupLocation}</span>
    </div>
    <span className="summary-edit">Change</span>
  </button>

  <button className="summary-row" onClick={onEditDropoff}>
    <span className="summary-dot dropoff-dot" />
    <div className="summary-texts">
      <span className="summary-label">Drop-off</span>
      <span className="summary-value">
        {dropoffLocation || "Choose destination"}
      </span>
    </div>
    <span className="summary-edit">Change</span>
  </button>
</section>

<section className="ride-section">
  <h2 className="section-heading">Route preview</h2>
  <div className="ride-map-wrapper route-map">
    <img
      src="/map_route.png"
      alt="Map preview of your route"
      className="ride-map-image"
    />

    {/* fake pins on top of the image */}
    <div className="route-pin route-pin--pickup" />
    <div className="route-pin route-pin--dropoff" />
  </div>
</section>


<button className="ride-primary-btn" onClick={onContinue}>
  Continue
</button>
      
    </div>
  );
};

export default RideScreen;

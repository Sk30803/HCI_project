import React, { useState } from "react";

const RideScreen = ({ onBack }) => {
  const [selectedVehicle, setSelectedVehicle] = useState("bike");

  return (
    <div className="ride-screen">
      {/* Top row: back + title */}
      <section className="ride-section ride-header-row">
        <button className="header-icon-button" onClick={onBack} aria-label="Back to home">
          ←
        </button>
        <h1 className="ride-title">Book a ride</h1>
      </section>

      {/* Locations */}
      <section className="ride-section">
        <div className="ride-locations">
          <div className="location-row">
            <span className="location-dot pickup-dot" />
            <div className="location-texts">
              <span className="location-label">Pick-up</span>
              <input
                className="location-input"
                defaultValue="Current location"
                aria-label="Pickup location"
              />
            </div>
          </div>

          <button className="swap-button" aria-label="Swap locations">
            ⇅
          </button>

          <div className="location-row">
            <span className="location-dot dropoff-dot" />
            <div className="location-texts">
              <span className="location-label">Drop-off</span>
              <input
                className="location-input"
                placeholder="Enter destination"
                aria-label="Drop-off location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="ride-section">
        <div className="map-placeholder">
          Map preview (for prototype)
        </div>
      </section>

      {/* Vehicle options */}
      <section className="ride-section">
        <h2 className="section-heading">Choose vehicle</h2>
        <div className="vehicle-list">
          <button
            className={`vehicle-card ${
              selectedVehicle === "bike" ? "vehicle-card--selected" : ""
            }`}
            onClick={() => setSelectedVehicle("bike")}
          >
            <div className="vehicle-main">
              <span className="vehicle-name">Bike</span>
              <span className="vehicle-time">3 min away</span>
            </div>
            <div className="vehicle-meta">
              <span className="vehicle-capacity">1 seat • Low cost</span>
              <span className="vehicle-price">Rs 180</span>
            </div>
          </button>

          <button
            className={`vehicle-card ${
              selectedVehicle === "rickshaw" ? "vehicle-card--selected" : ""
            }`}
            onClick={() => setSelectedVehicle("rickshaw")}
          >
            <div className="vehicle-main">
              <span className="vehicle-name">Rickshaw</span>
              <span className="vehicle-time">5 min away</span>
            </div>
            <div className="vehicle-meta">
              <span className="vehicle-capacity">2–3 seats • Covered</span>
              <span className="vehicle-price">Rs 260</span>
            </div>
          </button>

          <button
            className={`vehicle-card ${
              selectedVehicle === "car" ? "vehicle-card--selected" : ""
            }`}
            onClick={() => setSelectedVehicle("car")}
          >
            <div className="vehicle-main">
              <span className="vehicle-name">Car</span>
              <span className="vehicle-time">7 min away</span>
            </div>
            <div className="vehicle-meta">
              <span className="vehicle-capacity">4 seats • Extra comfort</span>
              <span className="vehicle-price">Rs 420</span>
            </div>
          </button>
        </div>
      </section>

      {/* Payment + confirm */}
      <section className="ride-section ride-footer">
        <div className="ride-payment">
          <span className="payment-label">Payment</span>
          <button className="payment-method">
            Cash ▾
          </button>
        </div>
        <button className="ride-confirm-btn">
          Confirm ride
        </button>
      </section>
    </div>
  );
};

export default RideScreen;

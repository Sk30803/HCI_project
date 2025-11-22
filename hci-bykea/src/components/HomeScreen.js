import React from "react";

const HomeScreen = () => {
  return (
    <div className="home">

      {/* Greeting */}
      <section className="home-section">
        <h1 className="home-title">Where do you want to go?</h1>
        <p className="home-subtitle">Book a ride or send a parcel.</p>
      </section>

      {/* Search / destination input */}
      <section className="home-section">
        <div className="destination-card" role="button" tabIndex={0}>
          <div className="destination-icon">📍</div>
          <div className="destination-text">
            <span className="destination-label">Enter destination</span>
            <span className="destination-placeholder">Tap to select drop-off</span>
          </div>
        </div>
      </section>

      {/* Primary quick actions */}
      <section className="home-section">
        <div className="quick-actions">
          <button className="quick-action-card">
            <span className="quick-action-icon">🛵</span>
            <span className="quick-action-title">Ride</span>
          </button>

          <button className="quick-action-card">
            <span className="quick-action-icon">📦</span>
            <span className="quick-action-title">Parcel</span>
          </button>

          <button className="quick-action-card">
            <span className="quick-action-icon">💸</span>
            <span className="quick-action-title">Cash</span>
          </button>
        </div>
      </section>

    </div>
  );
};

export default HomeScreen;

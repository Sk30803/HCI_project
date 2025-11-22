import React from "react";

const HomeScreen = () => {
  return (
    <div className="home">
      {/* Greeting */}
      <section className="home-section">
        <h1 className="home-title">Where do you want to go today?</h1>
        <p className="home-subtitle">Book a ride, send a parcel, or cash-in securely.</p>
      </section>

      {/* Search / destination input */}
      <section className="home-section">
        <div className="destination-card" role="button" tabIndex={0}>
          <div className="destination-icon">📍</div>
          <div className="destination-text">
            <span className="destination-label">Enter destination</span>
            <span className="destination-placeholder">Tap to choose drop-off location</span>
          </div>
        </div>
      </section>

      {/* Primary quick actions */}
      <section className="home-section">
        <h2 className="section-heading">Main services</h2>
        <div className="quick-actions">
          <button className="quick-action-card">
            <span className="quick-action-icon">🛵</span>
            <span className="quick-action-title">Ride</span>
            <span className="quick-action-subtitle">Bike / Rickshaw / Car</span>
          </button>

          <button className="quick-action-card">
            <span className="quick-action-icon">📦</span>
            <span className="quick-action-title">Parcel</span>
            <span className="quick-action-subtitle">Send items safely</span>
          </button>

          <button className="quick-action-card">
            <span className="quick-action-icon">💸</span>
            <span className="quick-action-title">Cash</span>
            <span className="quick-action-subtitle">Cash pick & drop</span>
          </button>
        </div>
      </section>

      {/* Promotions / info */}
      <section className="home-section">
        <h2 className="section-heading">Offers & tips</h2>
        <div className="promo-card">
          <div className="promo-text">
            <h3 className="promo-title">Bykea Wallet (New)</h3>
            <p className="promo-description">
              Add money once, pay for rides and parcels instantly. No need to switch apps.
            </p>
          </div>
          <button className="promo-cta">Set up wallet</button>
        </div>
      </section>

      {/* Recent locations */}
      <section className="home-section">
        <h2 className="section-heading">Recent locations</h2>
        <ul className="recent-list">
          <li className="recent-item">
            <span className="recent-icon">🏫</span>
            <div className="recent-text">
              <span className="recent-title">IBA Main Campus</span>
              <span className="recent-subtitle">University Road</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon">🏠</span>
            <div className="recent-text">
              <span className="recent-title">Home</span>
              <span className="recent-subtitle">Gulshan-e-Iqbal</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon">🏥</span>
            <div className="recent-text">
              <span className="recent-title">Aga Khan Hospital</span>
              <span className="recent-subtitle">Stadium Road</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomeScreen;

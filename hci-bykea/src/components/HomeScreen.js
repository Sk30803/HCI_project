// src/components/HomeScreen.js
import React, { useState } from "react";

const HomeScreen = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState("ride");

  const handleContinue = () => {
    if (!onSelectService) return;
    onSelectService(selectedService); // right now only "ride" is wired in App.js
  };

  return (
    <div className="home">
      {/* Hero card: one primary goal */}
      <section className="home-section hero-card">
        <p className="hero-eyebrow">Start something</p>
        <h1 className="hero-title">Where do you want to go?</h1>

        {/* From */}
        <div className="hero-row">
          <span className="hero-label">From</span>
          <button className="hero-pill">
            <span className="hero-pill-dot" />
            <span className="hero-pill-text">Current location</span>
          </button>
        </div>

        {/* To */}
        <div className="hero-row">
          <span className="hero-label">To</span>
          <button className="hero-input" aria-label="Choose destination">
            <span className="hero-input-placeholder">
              Search destination or choose on map
            </span>
          </button>
        </div>

        {/* Primary CTA */}
        <button className="hero-cta" onClick={handleContinue}>
          Continue
        </button>
      </section>

      {/* Service chooser: 3-tab pill */}
      <section className="home-section">
        <div className="service-switch" role="tablist" aria-label="Select service type">
          <button
            className={`service-tab ${
              selectedService === "ride" ? "service-tab--active" : ""
            }`}
            role="tab"
            onClick={() => setSelectedService("ride")}
          >
            🛵 Ride
          </button>
          <button
            className={`service-tab ${
              selectedService === "parcel" ? "service-tab--active" : ""
            }`}
            role="tab"
            onClick={() => setSelectedService("parcel")}
          >
            📦 Parcel
          </button>
          <button
            className={`service-tab ${
              selectedService === "cash" ? "service-tab--active" : ""
            }`}
            role="tab"
            onClick={() => setSelectedService("cash")}
          >
            💸 Cash
          </button>
        </div>

        <p className="service-helper">
          You’re booking a <strong>{selectedService}</strong>. You can change this anytime.
        </p>
      </section>

      {/* Wallet & offers (secondary) */}
      <section className="home-section">
        <div className="wallet-card">
          <div>
            <p className="wallet-label">Bykea Wallet</p>
            <p className="wallet-balance">Rs 0</p>
            <p className="wallet-note">Pay instantly for rides and parcels.</p>
          </div>
          <button className="wallet-action">Add money</button>
        </div>
      </section>

      {/* Recent locations (short list) */}
      <section className="home-section">
        <div className="recent-header-row">
          <h2 className="section-heading">Recent locations</h2>
          <button className="link-button">View all</button>
        </div>
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
        </ul>
      </section>
    </div>
  );
};

export default HomeScreen;

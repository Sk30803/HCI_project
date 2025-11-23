import React, { useState } from "react";

const SUGGESTIONS = [
  "Teen Talwar, Clifton",
  "Do Talwar, Clifton",
  "Gulshan-e-Iqbal",
  "Gulistan-e-Jauhar",
  "IBA Main Campus, University Road",
  "Aga Khan Hospital, Stadium Road",
  "Lucky One Mall, Rashid Minhas Road",
];

const DropoffScreen = ({ onBack, onSelectDropoff, selectedDropoff }) => {
  const [query, setQuery] = useState("");
  const filtered = SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pickup-screen">
      {/* header */}
      <div className="ride-back-row">
  <button
    className="back-chip"
    onClick={onBack}
  >
    <span className="back-arrow">⟵</span>
    <span className="back-text">Go back</span>
  </button>
</div>

<section className="pickup-section pickup-header-card">
  <h1 className="ride-title">Choose drop-off</h1>
  <p className="ride-subtitle">Step 2 · Set your destination</p>
</section>


      {/* Search + suggestions */}
      <section className="pickup-section">
        <input
          className="pickup-search"
          placeholder="Search area, street or landmark"
          aria-label="Search drop-off location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className="pickup-suggestions">
            {filtered.length === 0 && (
              <div className="pickup-suggestion-item disabled">No matches</div>
            )}
            {filtered.map((item) => (
              <button
                key={item}
                className="pickup-suggestion-item"
                onClick={() => onSelectDropoff(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Map */}
      <section className="pickup-section">
        <h2 className="section-heading">Choose from map</h2>
        <div
          className="pickup-map-wrapper"
          onClick={() => onSelectDropoff("Pinned on map")}
        >
          <img
            src="/map_image.png"
            className="pickup-map-image"
            alt="Map showing nearby area"
          />
        </div>
        <p className="pickup-small-hint">
          In the full app, you would drag and long-press on the map to set your exact drop-off.
        </p>
      </section>

      {/* Saved places (for drop-off) */}
      <section className="pickup-section">
        <h2 className="section-heading">Saved places</h2>
        <button
          className="pickup-row"
          onClick={() => onSelectDropoff("Home, Gulshan-e-Iqbal")}
        >
          <span className="pickup-icon">🏠</span>
          <div className="pickup-texts">
            <span className="pickup-title">Home</span>
            <span className="pickup-subtitle">Gulshan-e-Iqbal</span>
          </div>
        </button>
        <button
          className="pickup-row"
          onClick={() => onSelectDropoff("IBA Main Campus, University Road")}
        >
          <span className="pickup-icon">🏫</span>
          <div className="pickup-texts">
            <span className="pickup-title">IBA Main Campus</span>
            <span className="pickup-subtitle">University Road</span>
          </div>
        </button>
      </section>

      {/* Recent */}
      <section className="pickup-section">
        <h2 className="section-heading">Recent</h2>
        <button
          className="pickup-row"
          onClick={() => onSelectDropoff("Aga Khan Hospital, Stadium Road")}
        >
          <span className="pickup-icon">🏥</span>
          <div className="pickup-texts">
            <span className="pickup-title">Aga Khan Hospital</span>
            <span className="pickup-subtitle">Stadium Road</span>
          </div>
        </button>
        <button
          className="pickup-row"
          onClick={() => onSelectDropoff("Lucky One Mall, Rashid Minhas Road")}
        >
          <span className="pickup-icon">🏬</span>
          <div className="pickup-texts">
            <span className="pickup-title">Lucky One Mall</span>
            <span className="pickup-subtitle">Rashid Minhas Road</span>
          </div>
        </button>
      </section>
    </div>
  );
};

export default DropoffScreen;

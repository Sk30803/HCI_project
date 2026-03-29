import React from "react";
import "./RideScreen.css";

const rideDict = {
  en: {
    flowLabel: "Book a ride",
    title: "Step 1 · Choose locations",
    yourTrip: "Your trip",
    pickup: "Pick-up",
    dropoff: "Drop-off",
    change: "Change",
    routePreview: "Route preview",
    continue: "Continue",
  },
  ur: {
    flowLabel: "رائیڈ بک کریں",
    title: "مرحلہ 1 · مقامات منتخب کریں",
    yourTrip: "آپ کا سفر",
    pickup: "پک اپ",
    dropoff: "ڈراپ آف",
    change: "تبدیل کریں",
    routePreview: "روٹ پری ویو",
    continue: "جاری رکھیں",
  },
};

const RideScreen = ({
  onBack,
  onEditPickup,
  onEditDropoff,
  pickupLocation,
  dropoffLocation,
  onContinue,
  locale = "en",
  accessibilityOn = false,
  readAloud = () => {},
}) => {
  const t = (key) =>
    (rideDict[locale] && rideDict[locale][key]) ||
    rideDict.en[key] ||
    key;

  return (
    <div className="ride-screen">

      {/* BACK BUTTON */}
      <div className="ride-back-row">
        <button
          className="back-chip"
          onClick={onBack}
          aria-label="Go back to previous screen"
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Go back</span>
        </button>
      </div>

      {/* HEADER CARD */}
      <section className="ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
      </section>

      {/* SUMMARY CARD */}
      <section className="summary-card">
        <h2 className="summary-title">{t("yourTrip")}</h2>

        <div className="summary-container">
          {/* Pickup Row */}
          <button 
            className="summary-row" 
            onClick={onEditPickup}
            aria-label={`Edit pickup location: ${pickupLocation}`}
          >
            <div className="summary-icon-wrapper">
              <span className="summary-dot pickup-dot" />
            </div>
            <div className="summary-texts">
              <span className="summary-label">{t("pickup")}</span>
              <span className="summary-value">{pickupLocation}</span>
            </div>
            <span className="summary-edit">{t("change")}</span>
          </button>

          {/* Connecting Line */}
          <div className="summary-connector" />

          {/* Dropoff Row */}
          <button 
            className="summary-row" 
            onClick={onEditDropoff}
            aria-label={`Edit dropoff location: ${dropoffLocation || "Choose destination"}`}
          >
            <div className="summary-icon-wrapper">
              <span className="summary-dot dropoff-dot" />
            </div>
            <div className="summary-texts">
              <span className="summary-label">{t("dropoff")}</span>
              <span className="summary-value">
                {dropoffLocation || "Choose destination"}
              </span>
            </div>
            <span className="summary-edit">{t("change")}</span>
          </button>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <h2 className="section-heading">{t("routePreview")}</h2>

        <div className="ride-map-wrapper">
          <img
            src="/map_route.png"
            alt="Map preview of your route"
            className="ride-map-image"
          />

          {/* Pins */}
          <div className="route-pin route-pin--pickup" aria-hidden="true">
            <span className="pin-icon">📍</span>
          </div>
          <div className="route-pin route-pin--dropoff" aria-hidden="true">
            <span className="pin-icon">🏁</span>
          </div>
        </div>
      </section>

      {/* CONTINUE BUTTON */}
      <div className="ride-footer">
        <button 
          className="ride-primary-btn" 
          onClick={onContinue}
          aria-label="Continue to next step"
        >
          {t("continue")}
        </button>
      </div>

    </div>
  );
};

export default RideScreen;
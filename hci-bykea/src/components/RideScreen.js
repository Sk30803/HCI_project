// RideScreen.js
import React from "react";

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
          <span className="back-arrow">⟵</span>
          <span className="back-text">Go back</span>
        </button>
      </div>

      {/* HEADER CARD */}
      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
      </section>

      {/* SUMMARY CARD */}
      <section className="ride-section summary-card">
        <p className="summary-title">{t("yourTrip")}</p>

        <button className="summary-row" onClick={onEditPickup}>
          <span className="summary-dot pickup-dot" />
          <div className="summary-texts">
            <span className="summary-label">{t("pickup")}</span>
            <span className="summary-value">{pickupLocation}</span>
          </div>
          <span className="summary-edit">{t("change")}</span>
        </button>

        <button className="summary-row" onClick={onEditDropoff}>
          <span className="summary-dot dropoff-dot" />
          <div className="summary-texts">
            <span className="summary-label">{t("dropoff")}</span>
            <span className="summary-value">
              {dropoffLocation || "Choose destination"}
            </span>
          </div>
          <span className="summary-edit">{t("change")}</span>
        </button>
      </section>

      {/* MAP SECTION */}
      <section className="ride-section">
        <h2 className="section-heading">{t("routePreview")}</h2>

        <div className="ride-map-wrapper route-map">
          <img
            src="/map_route.png"
            alt="Map preview of your route"
            className="ride-map-image"
          />

          {/* Pins */}
          <div className="route-pin route-pin--pickup" />
          <div className="route-pin route-pin--dropoff" />
        </div>
      </section>

      {/* CONTINUE BUTTON */}
      <button className="ride-primary-btn" onClick={onContinue}>
        {t("continue")}
      </button>

    </div>
  );
};

export default RideScreen;

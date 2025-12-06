// src/components/VehicleScreen.js
import React from "react";

const vehicleDict = {
  en: {
    flowLabel: "Book a ride",
    title: "Step 2 · Choose vehicle",
    goBack: "Go back",
    away: "away",
    continue: "Continue",
    bikeLabel: "Bike",
    bikeDetail: "1 seat • Low cost",
    rickshawLabel: "Rickshaw",
    rickshawDetail: "2–3 seats • Covered",
    carLabel: "Car",
    carDetail: "4 seats • Comfort",
    acCarLabel: "AC Car",
    acCarDetail: "4 seats • A/C",
    minute: "min",
    currency: "Rs",
    away: "away",
  },
  ur: {
    flowLabel: "رائیڈ بک کریں",
    title: "مرحلہ 2 · گاڑی منتخب کریں",
    goBack: "واپس جائیں",
    away: "دور",
    continue: "جاری رکھیں",
    bikeLabel: "بائیک",
    bikeDetail: "۱ سیٹ • کم خرچ",
    rickshawLabel: "رکشہ",
    rickshawDetail: "۲–۳ سیٹیں • ڈھکی ہوئی",
    carLabel: "کار",
    carDetail: "۴ سیٹیں • آرام دہ",
    acCarLabel: "اے سی کار",
    acCarDetail: "۴ سیٹیں • اے سی",
    minute: "منٹ",
    currency: "روپے",
    away: "دور",
  },
};

const VehicleScreen = ({
  selectedVehicle,
  onBack,
  onSelectVehicle,
  onContinue,
  locale = "en",
}) => {
  const t = (key) => {
    return (vehicleDict[locale] && vehicleDict[locale][key]) || vehicleDict.en[key] || key;
  };

  const vehicles = [
    {
      id: "bike",
      label: t("bikeLabel"),
      detail: t("bikeDetail"),
      price: locale === "ur" ? "Rs ۱۸۰" : "Rs 180",
      eta: locale === "ur" ? "۳ منٹ" : "3 min",
    },
    {
      id: "rickshaw",
      label: t("rickshawLabel"),
      detail: t("rickshawDetail"),
      price: locale === "ur" ? "Rs ۲۶۰" : "Rs 260",
      eta: locale === "ur" ? "۵ منٹ" : "5 min",
    },
    {
      id: "car",
      label: t("carLabel"),
      detail: t("carDetail"),
      price: locale === "ur" ? "Rs ۴۲۰" : "Rs 420",
      eta: locale === "ur" ? "۷ منٹ" : "7 min",
    },
    {
      id: "ac-car",
      label: t("acCarLabel"),
      detail: t("acCarDetail"),
      price: locale === "ur" ? "Rs ۴۸۰" : "Rs 480",
      eta: locale === "ur" ? "۸ منٹ" : "8 min",
    },
  ];

  return (
    <div className="vehicle-screen">
      {/* back chip */}
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">{t("goBack")}</span>
        </button>
      </div>

      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
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
                <span className="vehicle-time">
                {v.eta} {t("minute")} {t("away")}
                </span>
              </div>
              <div className="vehicle-meta">
                <span className="vehicle-capacity">{v.detail}</span>
                <span className="vehicle-price">{t("currency")} {v.price}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="ride-section ride-footer-single">
        <button className="ride-primary-btn" onClick={onContinue}>
          {t("continue")}
        </button>
      </section>
    </div>
  );
};

export default VehicleScreen;

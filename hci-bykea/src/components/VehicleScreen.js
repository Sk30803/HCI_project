// src/components/VehicleScreen.js
import React from "react";
import "./VehicleScreen.css";

const vehicleDict = {
  en: {
    flowLabel: "Book a ride",
    title: "Step 2 · Choose vehicle",
    goBack: "Go back",
    continue: "Continue",
    bikeLabel: "Bike",
    bikeDetail: "1 seat • Low cost",
    rickshawLabel: "Rickshaw",
    rickshawDetail: "2–3 seats • Covered",
    carLabel: "Car",
    carDetail: "4 seats • Comfort",
    acCarLabel: "AC Car",
    acCarDetail: "4 seats • A/C",
  },
  ur: {
    flowLabel: "رائیڈ بک کریں",
    title: "مرحلہ 2 · گاڑی منتخب کریں",
    goBack: "واپس جائیں",
    continue: "جاری رکھیں",
    bikeLabel: "بائیک",
    bikeDetail: "۱ سیٹ • کم خرچ",
    rickshawLabel: "رکشہ",
    rickshawDetail: "۲–۳ سیٹیں • ڈھکی ہوئی",
    carLabel: "کار",
    carDetail: "۴ سیٹیں • آرام دہ",
    acCarLabel: "اے سی کار",
    acCarDetail: "۴ سیٹیں • اے سی",
  },
};

const VehicleScreen = ({
  selectedVehicle,
  onBack,
  onSelectVehicle,
  onContinue,
  locale = "en",
}) => {
  const t = (key) =>
    (vehicleDict[locale] && vehicleDict[locale][key]) ||
    vehicleDict.en[key] ||
    key;

  const vehicles = [
    {
      id: "bike",
      label: t("bikeLabel"),
      detail: t("bikeDetail"),
      icon: "🛵",
      price: locale === "ur" ? "۱۸۰" : "180",
      eta: locale === "ur" ? "۳" : "3",
    },
    {
      id: "rickshaw",
      label: t("rickshawLabel"),
      detail: t("rickshawDetail"),
      icon: "🛺",
      price: locale === "ur" ? "۲۶۰" : "260",
      eta: locale === "ur" ? "۵" : "5",
    },
    {
      id: "car",
      label: t("carLabel"),
      detail: t("carDetail"),
      icon: "🚗",
      price: locale === "ur" ? "۴۲۰" : "420",
      eta: locale === "ur" ? "۷" : "7",
    },
    {
      id: "ac-car",
      label: t("acCarLabel"),
      detail: t("acCarDetail"),
      icon: "❄️",
      price: locale === "ur" ? "۴۸۰" : "480",
      eta: locale === "ur" ? "۸" : "8",
    },
  ];

  return (
    <div className="vehicle-screen">

      {/* Back Button */}
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">{t("goBack")}</span>
        </button>
      </div>

      {/* Header */}
      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
      </section>

      {/* Vehicle Options */}
      <section className="ride-section">
        <div className="vehicle-list">
          {vehicles.map((v) => (
            <button
              key={v.id}
              className={
                "vehicle-card " +
                (selectedVehicle === v.id ? "vehicle-card--selected" : "")
              }
              onClick={() => onSelectVehicle(v.id)}
            >
              <div className="vehicle-icon">{v.icon}</div>

              <div className="vehicle-info">
                <span className="vehicle-name">{v.label}</span>
                <span className="vehicle-detail">{v.detail}</span>
              </div>

              <div className="vehicle-meta">
                <span className="vehicle-eta">
                  {locale === "ur"
                    ? `${v.eta} منٹ دور`
                    : `${v.eta} min away`}
                </span>
                <span className="vehicle-price">
                  {locale === "ur" ? `روپے ${v.price}` : `Rs ${v.price}`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="ride-section ride-footer-single">
        <button className="ride-primary-btn" onClick={onContinue}>
          {t("continue")}
        </button>
      </section>
    </div>
  );
};

export default VehicleScreen;

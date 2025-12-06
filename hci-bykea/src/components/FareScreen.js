import React, { useState } from "react";

const fareDict = {
  en: {
    goBack: "Go back",
    flowLabel: "Book a ride",
    title: "Step 3 · Choose fare",
    selectedVehicle: "Selected vehicle",
    minFarePrefix: "Min Rs",
    setYourFare: "Set your fare",
    fasterMatchHint: "You can offer more to get a faster match.",
    paymentMethod: "Payment method",
    cashOption: "Cash (pay to driver)",
    jazzcashOption: "JazzCash",
    walletOption: "Bykea Wallet",
    continue: "Continue",
  },
  ur: {
    goBack: "واپس جائیں",
    flowLabel: "رائیڈ بک کریں",
    title: "مرحلہ 3 · کرایہ منتخب کریں",
    selectedVehicle: "منتخب گاڑی",
    minFarePrefix: "کم از کم Rs",
    setYourFare: "اپنا کرایہ مقرر کریں",
    fasterMatchHint:
      "تیز میچ کے لیے آپ زیادہ کرایہ پیش کر سکتے ہیں۔",
    paymentMethod: "ادائیگی کا طریقہ",
    cashOption: "نقد (ڈرائیور کو ادا کریں)",
    jazzcashOption: "جاز کیش",
    walletOption: "بائیکیا والیٹ",
    continue: "جاری رکھیں",
  },
};

const FareScreen = ({
  selectedVehicle,
  onBack,
  onConfirmFare,
  onFareChange,
  locale = "en",
}) => {
  const t = (key) => {
    return (fareDict[locale] && fareDict[locale][key]) || fareDict.en[key] || key;
  };

  const baseFares = {
    bike: 180,
    rickshaw: 260,
    car: 420,
    "ac-car": 480,
  };

  const minFare = baseFares[selectedVehicle] || 0;

  const [fare, setFare] = useState(minFare);
  const [payment, setPayment] = useState("cash");

  const vehicleName =
    selectedVehicle?.replace("-", " ").toUpperCase() || "";

  return (
    <div className="fare-screen">
      {/* Back */}
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

      {/* Vehicle summary */}
      <section className="ride-section summary-card">
        <p className="summary-title">{t("selectedVehicle")}</p>
        <div className="summary-row" style={{ padding: "4px 0" }}>
          <span className="summary-value" style={{ fontWeight: 600 }}>
            {vehicleName}
          </span>
          <span className="summary-edit">
            {t("minFarePrefix")} {minFare}
          </span>
        </div>
      </section>

      {/* Fare slider + manual input */}
      <section className="ride-section">
        <h2 className="section-heading">{t("setYourFare")}</h2>

        <input
          type="range"
          min={minFare}
          max={minFare + 200}
          value={fare}
          onChange={(e) => {
            const value = Number(e.target.value);
            setFare(value);
            onFareChange && onFareChange(value);
          }}
          style={{ width: "100%" }}
        />

        <div style={{ marginTop: 10, fontSize: 16, fontWeight: 600 }}>
          Rs {fare}
        </div>

        {/* Manual number input */}
        <input
          type="number"
          className="pickup-search"
          style={{ marginTop: 10 }}
          value={fare}
          min={minFare}
          max={minFare + 200}
          onChange={(e) => {
            const value = Number(e.target.value);
            setFare(value);
            onFareChange && onFareChange(value);
          }}
        />

        <p style={{ fontSize: 12, color: "#6b7180", marginTop: 6 }}>
          {t("fasterMatchHint")}
        </p>
      </section>

      {/* Payment dropdown */}
      <section className="ride-section">
        <h2 className="section-heading">{t("paymentMethod")}</h2>

        <select
          className="pickup-search"
          style={{ padding: "10px 12px" }}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cash">{t("cashOption")}</option>
          <option value="jazzcash">{t("jazzcashOption")}</option>
          <option value="wallet">{t("walletOption")}</option>
        </select>
      </section>

      {/* Continue */}
      <section className="ride-section ride-footer-single">
        <button
          className="ride-primary-btn"
          onClick={() => onConfirmFare(fare, payment)}
        >
          {t("continue")}
        </button>
      </section>
    </div>
  );
};

export default FareScreen;

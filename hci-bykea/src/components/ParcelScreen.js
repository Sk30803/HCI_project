import React from "react";

const parcelDict = {
  en: {
    flowLabel: "Send a parcel",
    title: "Step · Parcel details",
    from: "From",
    to: "To",
    unknown: "Not set",
    parcelType: "Parcel type",
    doc: "Documents",
    smallBox: "Small box",
    largeBox: "Large box",
    other: "Other",
    size: "Size",
    weight: "Weight",
    fragile: "Fragile item",
    fragileHint: "Handle with extra care",
    notes: "Delivery notes (optional)",
    notesPlaceholder: "E.g. call when you arrive, leave at gate…",
    continue: "Continue",
  },
  ur: {
    flowLabel: "پارسل بھیجیں",
    title: "مرحلہ · پارسل کی تفصیل",
    from: "سے",
    to: "تک",
    unknown: "طے نہیں ہوا",
    parcelType: "پارسل کی قسم",
    doc: "دستاویزات",
    smallBox: "چھوٹا ڈبہ",
    largeBox: "بڑا ڈبہ",
    other: "دیگر",
    size: "سائز",
    weight: "وزن",
    fragile: "نازک سامان",
    fragileHint: "اضافی احتیاط کی جائے گی",
    notes: "ہدایات (اختیاری)",
    notesPlaceholder: "مثال: پہنچ کر کال کریں، گیٹ پر چھوڑ دیں…",
    continue: "جاری رکھیں",
  },
};

const ParcelScreen = ({
  onBack,
  onContinue,
  pickupLocation,
  dropoffLocation,
  locale = "en",
  T,
  accessibilityOn = false,
  readAloud = () => {},
}) => {
  const t = (key) => {
    if (typeof T === "function") return T(key) || key;
    return (
      (parcelDict[locale] && parcelDict[locale][key]) ||
      parcelDict.en[key] ||
      key
    );
  };

  const fromText = pickupLocation || t("unknown");
  const toText = dropoffLocation || t("unknown");

  return (
    <div className="vehicle-screen">
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">
            {locale === "ur" ? "واپس جائیں" : "Go back"}
          </span>
        </button>
      </div>

      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
      </section>

      {/* From / To summary */}
      <section className="ride-section">
        <div className="trip-summary-card">
          <div className="trip-row">
            <div className="summary-label">{t("from")}</div>
            <div className="summary-value">{fromText}</div>
          </div>
          <div className="trip-row">
            <div className="summary-label">{t("to")}</div>
            <div className="summary-value">{toText}</div>
          </div>
        </div>
      </section>

      {/* Parcel details */}
      <section className="ride-section">
        <h2 className="section-heading">{t("parcelType")}</h2>
        <div className="button-group-vertical">
          <button className="service-large">📄 {t("doc")}</button>
          <button className="service-large">📦 {t("smallBox")}</button>
          <button className="service-large">📦 {t("largeBox")}</button>
          <button className="service-large">🧾 {t("other")}</button>
        </div>
      </section>

      <section className="ride-section">
        <h2 className="section-heading">{t("size")}</h2>
        <input
          className="text-input"
          type="text"
          placeholder={locale === "ur" ? "مثال: چھوٹا، درمیانہ…" : "E.g. small, medium…"}
        />
      </section>

      <section className="ride-section">
        <h2 className="section-heading">{t("weight")}</h2>
        <input
          className="text-input"
          type="text"
          placeholder={locale === "ur" ? "تقریبی وزن، کلو میں" : "Approx weight, in kg"}
        />
      </section>

      <section className="ride-section">
        <label className="checkbox-row">
          <input type="checkbox" />
          <span>
            {t("fragile")}
            <div className="helper-text">{t("fragileHint")}</div>
          </span>
        </label>
      </section>

      <section className="ride-section">
        <h2 className="section-heading">{t("notes")}</h2>
        <textarea
          className="text-area"
          rows={3}
          placeholder={t("notesPlaceholder")}
        />
      </section>

      <section className="ride-section">
        <button className="ride-primary-btn" onClick={onContinue}>
          {t("continue")}
        </button>
      </section>
    </div>
  );
};

export default ParcelScreen;

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

const dropoffDict = {
  en: {
    back: "Go back",
    title: "Choose drop-off",
    subtitle: "Step 2 · Set your destination",
    searchPlaceholder: "Search area, street or landmark",
    noMatches: "No matches",
    chooseFromMap: "Choose from map",
    mapHint:
      "In the full app, you would drag and long-press on the map to set your exact drop-off.",
    savedPlaces: "Saved places",
    recent: "Recent",
    home: "Home",
    homeArea: "Gulshan-e-Iqbal",
    iba: "IBA Main Campus",
    universityRoad: "University Road",
    agaKhan: "Aga Khan Hospital",
    stadiumRoad: "Stadium Road",
    luckyOne: "Lucky One Mall",
    rashidMinhas: "Rashid Minhas Road",
  },
  ur: {
    back: "واپس جائیں",
    title: "ڈراپ آف منتخب کریں",
    subtitle: "مرحلہ 2 · اپنی منزل سیٹ کریں",
    searchPlaceholder: "ایریا، گلی یا لینڈ مارک تلاش کریں",
    noMatches: "کوئی میچ نہیں ملا",
    chooseFromMap: "نقشے سے منتخب کریں",
    mapHint:
      "مکمل ایپ میں آپ نقشے پر لمبا دباکر بالکل درست ڈراپ آف سیٹ کر سکیں گے۔",
    savedPlaces: "محفوظ مقامات",
    recent: "حالیہ",
    home: "گھر",
    homeArea: "گلشنِ اقبال",
    iba: "آئی بی اے مین کیمپس",
    universityRoad: "یونیورسٹی روڈ",
    agaKhan: "آغا خان اسپتال",
    stadiumRoad: "اسٹیڈیم روڈ",
    luckyOne: "لکی ون مال",
    rashidMinhas: "راشد منہاس روڈ",
  },
};

const DropoffScreen = ({
  onBack,
  onSelectDropoff,
  selectedDropoff,
  locale = "en",
  T,
  accessibilityOn = false, // reserved for future use
  readAloud = () => {}, // reserved for future use
}) => {
  const [query, setQuery] = useState("");

  const t = (key) => {
    if (typeof T === "function") {
      const fromGlobal = T(key);
      if (fromGlobal && fromGlobal !== key) return fromGlobal;
    }
    return (dropoffDict[locale] && dropoffDict[locale][key]) ||
      dropoffDict.en[key] ||
      key;
  };

  const filtered = SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pickup-screen">
      {/* header */}
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">{t("back")}</span>
        </button>
      </div>

      <section className="pickup-section pickup-header-card">
        <h1 className="ride-title">{t("title")}</h1>
        <p className="ride-subtitle">{t("subtitle")}</p>
      </section>

      {/* Search + suggestions */}
      <section className="pickup-section">
        <input
          className="pickup-search"
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className="pickup-suggestions">
            {filtered.length === 0 && (
              <div className="pickup-suggestion-item disabled">
                {t("noMatches")}
              </div>
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
        <h2 className="section-heading">{t("chooseFromMap")}</h2>
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
        <p className="pickup-small-hint">{t("mapHint")}</p>
      </section>

      {/* Saved places */}
      <section className="pickup-section">
        <h2 className="section-heading">{t("savedPlaces")}</h2>
        <button
          className="pickup-row"
          onClick={() => onSelectDropoff("Home, Gulshan-e-Iqbal")}
        >
          <span className="pickup-icon">🏠</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("home")}</span>
            <span className="pickup-subtitle">{t("homeArea")}</span>
          </div>
        </button>
        <button
          className="pickup-row"
          onClick={() =>
            onSelectDropoff("IBA Main Campus, University Road")
          }
        >
          <span className="pickup-icon">🏫</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("iba")}</span>
            <span className="pickup-subtitle">{t("universityRoad")}</span>
          </div>
        </button>
      </section>

      {/* Recent */}
      <section className="pickup-section">
        <h2 className="section-heading">{t("recent")}</h2>
        <button
          className="pickup-row"
          onClick={() =>
            onSelectDropoff("Aga Khan Hospital, Stadium Road")
          }
        >
          <span className="pickup-icon">🏥</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("agaKhan")}</span>
            <span className="pickup-subtitle">{t("stadiumRoad")}</span>
          </div>
        </button>
        <button
          className="pickup-row"
          onClick={() =>
            onSelectDropoff("Lucky One Mall, Rashid Minhas Road")
          }
        >
          <span className="pickup-icon">🏬</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("luckyOne")}</span>
            <span className="pickup-subtitle">{t("rashidMinhas")}</span>
          </div>
        </button>
      </section>
    </div>
  );
};

export default DropoffScreen;

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

// local dictionary for this screen
const pickupDict = {
  en: {
    goBack: "Go back",
    title: "Choose pick-up",
    subtitle: "Step 1 · Set your start location",
    searchPlaceholder: "Search area, street or landmark",
    noMatches: "No matches",
    chooseFromMap: "Choose from map",
    mapHint:
      "In the full app, you would drag and long-press on the map to set your exact pick-up.",
    useCurrent: "Use current location",
    gpsHint: "GPS will detect your position",
    savedPlaces: "Saved places",
    home: "Home",
    gulshanIqbal: "Gulshan-e-Iqbal",
    ibaMain: "IBA Main Campus",
    universityRoad: "University Road",
    recent: "Recent",
    aghaKhan: "Aga Khan Hospital",
    stadiumRoad: "Stadium Road",
    luckyOne: "Lucky One Mall",
    rashidMinhas: "Rashid Minhas Road",
  },
  ur: {
    goBack: "واپس جائیں",
    title: "پک اپ منتخب کریں",
    subtitle: "مرحلہ 1 · اپنا آغاز مقام سیٹ کریں",
    searchPlaceholder: "علاقہ، سڑک یا نشانی تلاش کریں",
    noMatches: "کوئی نتیجہ نہیں ملا",
    chooseFromMap: "نقشے سے منتخب کریں",
    mapHint:
      "اصل ایپ میں آپ نقشے پر لمبے پریس سے درست پک اپ سیٹ کریں گے۔",
    useCurrent: "موجودہ مقام استعمال کریں",
    gpsHint: "جی پی ایس آپ کا مقام خود بخود معلوم کرے گا۔",
    savedPlaces: "محفوظ مقامات",
    home: "گھر",
    gulshanIqbal: "گلشنِ اقبال",
    ibaMain: "آئی بی اے مین کیمپس",
    universityRoad: "یونیورسٹی روڈ",
    recent: "حالیہ مقامات",
    aghaKhan: "آغا خان ہسپتال",
    stadiumRoad: "اسٹیڈیم روڈ",
    luckyOne: "لکی ون مال",
    rashidMinhas: "راشد منہاس روڈ",
  },
};

const PickupScreen = ({
  onBack,
  onSelectPickup,
  selectedPickup,
  locale = "en",
  T,
}) => {
  const [query, setQuery] = useState("");

  const t = (key) => {
    if (typeof T === "function") {
      const v = T(key);
      if (v && v !== key) return v;
    }
    return (
      (pickupDict[locale] && pickupDict[locale][key]) ||
      pickupDict.en[key] ||
      key
    );
  };

  const filtered = SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pickup-screen">
      <div className="ride-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">{t("goBack")}</span>
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
                onClick={() => onSelectPickup(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="pickup-section">
        <h2 className="section-heading">{t("chooseFromMap")}</h2>
        <div className="pickup-map-wrapper">
          <img
            src="/map_image.png"
            className="pickup-map-image"
            alt="Map showing nearby area"
          />
        </div>
        <p className="pickup-small-hint">{t("mapHint")}</p>
      </section>

      {/* Current location */}
      <section className="pickup-section">
        <button
          className="pickup-row"
          onClick={() => onSelectPickup("Current location")}
        >
          <span className="pickup-icon">📍</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("useCurrent")}</span>
            <span className="pickup-subtitle">{t("gpsHint")}</span>
          </div>
        </button>
      </section>

      {/* Saved places */}
      <section className="pickup-section">
        <h2 className="section-heading">{t("savedPlaces")}</h2>

        <button
          className="pickup-row"
          onClick={() => onSelectPickup("Home, Gulshan-e-Iqbal")}
        >
          <span className="pickup-icon">🏠</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("home")}</span>
            <span className="pickup-subtitle">{t("gulshanIqbal")}</span>
          </div>
        </button>

        <button
          className="pickup-row"
          onClick={() => onSelectPickup("IBA Main Campus, University Road")}
        >
          <span className="pickup-icon">🏫</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("ibaMain")}</span>
            <span className="pickup-subtitle">{t("universityRoad")}</span>
          </div>
        </button>
      </section>

      {/* Recent locations */}
      <section className="pickup-section">
        <h2 className="section-heading">{t("recent")}</h2>

        <button
          className="pickup-row"
          onClick={() =>
            onSelectPickup("Aga Khan Hospital, Stadium Road")
          }
        >
          <span className="pickup-icon">🏥</span>
          <div className="pickup-texts">
            <span className="pickup-title">{t("aghaKhan")}</span>
            <span className="pickup-subtitle">{t("stadiumRoad")}</span>
          </div>
        </button>

        <button
          className="pickup-row"
          onClick={() =>
            onSelectPickup("Lucky One Mall, Rashid Minhas Road")
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

export default PickupScreen;

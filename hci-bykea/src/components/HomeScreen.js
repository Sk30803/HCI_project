// src/components/HomeScreen.js
import React, { useEffect } from "react";

/**
 * Props:
 * - onSelectService(selected)   // callback when user chooses a service or continues
 * - locale                      // 'en' | 'ur'
 * - T                           // optional translation function: key => string
 * - accessibilityOn             // boolean
 * - readAloud(text)             // optional function to speak text
 */
const HomeScreen = ({
  onSelectService,
  locale = "en",
  T,
  accessibilityOn = false,
  readAloud = () => {},
}) => {
  // tiny fallback dictionary if T isn't passed
  const dict = {
    en: {
      title: "Where do you want to go?",
      bookRide: "Book Your Ride",
      parcel: "Parcel",
      cash: "Cash",
      wallet: "Bykea Wallet",
      walletNote: "Pay instantly for rides and parcels.",
      recent: "Recent locations",
      viewAll: "View all",
      addMoney: "Add money",
    },
    ur: {
      title: "آپ کہا جانا چاہتے ہیں؟",
      bookRide: "اپنا سفر بک کریں",
      parcel: "پارسل",
      cash: "کییش",
      wallet: "بائیکیا والیٹ",
      walletNote: "سفر اور پارسل کے لیے فوری ادائیگی کریں۔",
      recent: "حالیہ مقامات",
      viewAll: "تمام دیکھیں",
      addMoney: "رقم شامل کریں",
    },
  };

  // helper to get translation
  const t = (key) => {
    if (typeof T === "function") return T(key);
    return (dict[locale] && dict[locale][key]) || dict.en[key] || key;
  };

  // announce screen when accessibility turned on and screen mounts
  useEffect(() => {
    if (accessibilityOn) {
      const announce = `${t("title")}. ${t("bookRide")}`;
      readAloud(announce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibilityOn, locale]);

  const handleContinue = () => {
    if (onSelectService) onSelectService("ride");
  };

  return (
    <div className="home">
      {/* Hero card: one primary goal */}
      <section className="home-section hero-card" aria-labelledby="home-hero-title">
        <h1 id="home-hero-title" className="hero-title">{t("title")}</h1>

        {/* Primary CTA */}
        <button
          className="hero-cta"
          onClick={handleContinue}
          aria-label={t("bookRide")}
        >
          {t("bookRide")}
        </button>
      </section>

      {/* Large action buttons for other services */}
      <section className="home-section" aria-label="Service actions">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="service-large"
            onClick={() => onSelectService && onSelectService("parcel")}
            aria-label={t("parcel")}
          >
            📦 {t("parcel")}
          </button>

          <button
            className="service-large"
            onClick={() => onSelectService && onSelectService("cash")}
            aria-label={t("cash")}
          >
            💸 {t("cash")}
          </button>
        </div>

        <p className="service-helper" style={{ marginTop: 10 }}>
          {/* short helper text — keep in user's language */}
          {locale === "ur"
            ? "آپ ابھی بک کر سکتے ہیں۔ آپ جب چاہیں تبدیل کر سکتے ہیں۔"
            : "You’re booking a ride. You can change this anytime."}
        </p>
      </section>

      {/* Wallet & offers (secondary) */}
      <section className="home-section">
        <div className="wallet-card" role="region" aria-label={t("wallet")}>
          <div>
            <p className="wallet-label">{t("wallet")}</p>
            <p className="wallet-balance">Rs 0</p>
            <p className="wallet-note">{t("walletNote")}</p>
          </div>
          <button className="wallet-action" aria-label={t("addMoney")}>{t("addMoney")}</button>
        </div>
      </section>

      {/* Recent locations (short list) */}
      <section className="home-section" aria-labelledby="recent-label">
        <div className="recent-header-row">
          <h2 id="recent-label" className="section-heading">{t("recent")}</h2>
          <button className="link-button" aria-label={t("viewAll")}>{t("viewAll")}</button>
        </div>
        <ul className="recent-list">
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>🏫</span>
            <div className="recent-text">
              <span className="recent-title">IBA Main Campus</span>
              <span className="recent-subtitle">University Road</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>🏠</span>
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

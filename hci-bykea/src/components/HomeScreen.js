import React from "react";
import "./HomeScreen.css";

const HomeScreen = ({ onSelectService, locale = "en", T }) => {
  const dict = {
    en: {
      title: "Where do you want to go?",
      bookRide: "Book a Ride",
      parcel: "Send Parcel",
      cash: "Cash Pickup",
      wallet: "Wallet",
      walletNote: "Fast, secure & instant payments",
      recent: "Recent",
      viewAll: "See all",
      addMoney: "Add money",
      iba_main_campus: "IBA Main Campus",
      university_road: "University Road",
      home: "Home",
      gulshan_e_iqbal: "Gulshan-e-Iqbal",
    },
    ur: {
      title: "آپ کہا جانا چاہتے ہیں؟",
      bookRide: "اپنا سفر بک کریں",
      parcel: "پارسل",
      cash: "کییش",
      wallet: "بائیکیا والیٹ",
      walletNote: "سفر اور پارسل کے لیے فوری ادائیگی۔",
      recent: "حالیہ مقامات",
      viewAll: "تمام دیکھیں",
      addMoney: "رقم شامل کریں",
      iba_main_campus: "آئی بی اے مین کیمپس",
      university_road: "یونیورسٹی روڈ",
      home: "گھر",
      gulshan_e_iqbal: "گلشنِ اقبال",
    },
  };

  const t = (key) => (typeof T === "function" ? T(key) : dict[locale][key]);

  return (
    <div className="home-container">

      {/* TOP GREETING SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">{t("title")}</h1>

        <button
          className="primary-cta"
          onClick={() => onSelectService("ride")}
        >
          <span className="cta-icon">🛵</span>
          {t("bookRide")}
        </button>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="service-wrapper">
        <h2 className="section-label">Services</h2>
        <div className="service-grid">

          <button 
            className="service-card" 
            onClick={() => onSelectService("parcel")}
          >
            <div className="service-icon">📦</div>
            <div className="service-text">
              <div className="service-title">{t("parcel")}</div>
              <div className="service-desc">Door to door</div>
            </div>
          </button>

          <button 
            className="service-card" 
            onClick={() => onSelectService("cash")}
          >
            <div className="service-icon">💸</div>
            <div className="service-text">
              <div className="service-title">{t("cash")}</div>
              <div className="service-desc">Cash delivery</div>
            </div>
          </button>
        </div>
      </section>

      {/* WALLET CARD */}
      <section className="wallet-section">
        <div className="wallet-card">
          <div className="wallet-info">
            <div className="wallet-title">{t("wallet")}</div>
            <div className="wallet-balance">Rs 0</div>
            <div className="wallet-note">{t("walletNote")}</div>
          </div>

          <button 
            className="wallet-action" 
            onClick={() => onSelectService("wallet")}
          >
            + {t("addMoney")}
          </button>
        </div>
      </section>

      {/* RECENT LOCATIONS */}
      <section className="recent-section">
        <div className="recent-header">
          <h2 className="recent-title">{t("recent")}</h2>
          <button className="view-link">{t("viewAll")}</button>
        </div>

        <div className="recent-list">
          <button className="recent-card">
            <div className="recent-icon">🏫</div>
            <div className="recent-text">
              <div className="recent-name">{t("iba_main_campus")}</div>
              <div className="recent-desc">{t("university_road")}</div>
            </div>
          </button>

          <button className="recent-card">
            <div className="recent-icon">🏠</div>
            <div className="recent-text">
              <div className="recent-name">{t("home")}</div>
              <div className="recent-desc">{t("gulshan_e_iqbal")}</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
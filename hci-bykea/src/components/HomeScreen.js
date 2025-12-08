// Redesigned HomeScreen.js (Updated for spacing, decluttered layout, better sizing & smoother animations)
// NOTE: Functionality unchanged — only layout & visual structure redesigned.
// Combine with the updated CSS in the same file for now.

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
    <div className="home-container gradient-bg">

      {/* TOP GREETING SECTION */}
      <section className="hero-section card-float">
        <h1 className="hero-title neon-text">{t("title")}</h1>

        <button
          className="primary-cta elevate-lg"
          onClick={() => onSelectService("ride")}
        >
          <span className="cta-icon">🛵</span>
          {t("bookRide")}
        </button>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="service-wrapper fade-in">
        <h2 className="section-label">Services</h2>
        <div className="service-grid-modern">

          <button className="service-modern-card {
  margin-top: 4px;
  margin-bottom: 4px;
  background: #ffffffee;
  border-radius: 22px;
  padding: 20px;
  display: flex;
  gap: 16px;
  border: none;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: .2s ease;
} elevate" onClick={() => onSelectService("parcel")}>
            <div className="service-modern-icon">📦</div>
            <div className="service-modern-text">
              <div className="service-modern-title">{t("parcel")}</div>
              <div className="service-modern-desc">Door to door</div>
            </div>
          </button>

          <button className="service-modern-card elevate" onClick={() => onSelectService("cash")}>
            <div className="service-modern-icon">💸</div>
            <div className="service-modern-text">
              <div className="service-modern-title">{t("cash")}</div>
              <div className="service-modern-desc">Cash delivery</div>
            </div>
          </button>
        </div>
      </section>

      {/* WALLET CARD */}
      <section className="wallet-section fade-in-delay">
        <div className="wallet-card-modern {
  margin-top: 8px;
  margin-bottom: 8px;
  background: linear-gradient(135deg,#d8ffef,#c7ffe5);
  border-radius: 24px;
  padding: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
} elevate-lg">
          <div>
            <div className="wallet-title-modern">{t("wallet")}</div>
            <div className="wallet-balance-modern">Rs 0</div>
            <div className="wallet-note-modern">{t("walletNote")}</div>
          </div>

          <button className="wallet-action-modern" onClick={() => onSelectService("wallet")}>
            + {t("addMoney")}
          </button>
        </div>
      </section>

      {/* RECENT LOCATIONS */}
      <section className="recent-section fade-in-delay-more">
        <div className="recent-header">
          <h2 className="recent-title-modern">{t("recent")}</h2>
          <button className="view-link">{t("viewAll")}</button>
        </div>

        <div className="recent-list-modern">
          <button className="recent-modern-card elevate" >
            <div className="recent-modern-icon">🏫</div>
            <div className="recent-modern-text">
              <div className="recent-modern-name">{t("iba_main_campus")}</div>
              <div className="recent-modern-desc">{t("university_road")}</div>
            </div>
          </button>

          <button className="recent-modern-card elevate">
            <div className="recent-modern-icon">🏠</div>
            <div className="recent-modern-text">
              <div className="recent-modern-name">{t("home")}</div>
              <div className="recent-modern-desc">{t("gulshan_e_iqbal")}</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;


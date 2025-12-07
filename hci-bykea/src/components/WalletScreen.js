import React from "react";

const walletDict = {
  en: {
    title: "Bykea Wallet",
    balance: "Current balance",
    addMoney: "Add money",
    savedMethods: "Saved payment methods",
    cash: "Cash",
    card: "Credit / Debit card",
    easypaisa: "Easypaisa",
    jazzcash: "JazzCash",
    recent: "Recent activity",
    noActivity: "No transactions yet. Your recent rides and top-ups will appear here.",
  },
  ur: {
    title: "بائیکیا والیٹ",
    balance: "موجودہ بیلنس",
    addMoney: "رقم شامل کریں",
    savedMethods: "محفوظ ادائیگی کے طریقے",
    cash: "نقد",
    card: "کریڈٹ / ڈیبٹ کارڈ",
    easypaisa: "ایزی پیسہ",
    jazzcash: "جاز کیش",
    recent: "حالیہ سرگرمی",
    noActivity: "ابھی کوئی ٹرانزیکشن نہیں۔ آپ کی حالیہ رائیڈز اور ٹاپ اپ یہاں نظر آئیں گے۔",
  },
};

const WalletScreen = ({
  onBack,
  locale = "en",
  T,
  accessibilityOn = false,
  readAloud = () => {},
}) => {
  const t = (key) => {
    if (typeof T === "function") return T(key) || key;
    return (
      (walletDict[locale] && walletDict[locale][key]) ||
      walletDict.en[key] ||
      key
    );
  };

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
        <h1 className="ride-title">{t("title")}</h1>
        <p className="wallet-note">
          {locale === "ur"
            ? "ایپ کے اندر محفوظ اور تیز ادائیگی کے لیے والیٹ استعمال کریں۔"
            : "Use wallet for safe, fast in-app payments."}
        </p>
      </section>

      {/* Balance card */}
      <section className="ride-section">
        <div className="wallet-card" role="region" aria-label={t("balance")}>
          <div>
            <p className="wallet-label">{t("balance")}</p>
            <p className="wallet-balance">Rs 0</p>
          </div>
          <button className="wallet-action">{t("addMoney")}</button>
        </div>
      </section>

      {/* Saved methods */}
      <section className="ride-section">
        <h2 className="section-heading">{t("savedMethods")}</h2>
        <ul className="recent-list">
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>
              💸
            </span>
            <div className="recent-text">
              <span className="recent-title">{t("cash")}</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>
              💳
            </span>
            <div className="recent-text">
              <span className="recent-title">{t("card")}</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>
              📱
            </span>
            <div className="recent-text">
              <span className="recent-title">{t("easypaisa")}</span>
            </div>
          </li>
          <li className="recent-item">
            <span className="recent-icon" aria-hidden>
              📱
            </span>
            <div className="recent-text">
              <span className="recent-title">{t("jazzcash")}</span>
            </div>
          </li>
        </ul>
      </section>

      {/* Recent activity */}
      <section className="ride-section">
        <h2 className="section-heading">{t("recent")}</h2>
        <p className="helper-text">{t("noActivity")}</p>
      </section>
    </div>
  );
};

export default WalletScreen;

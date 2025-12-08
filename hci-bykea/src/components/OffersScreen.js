// src/components/OffersScreen.js
import React, { useEffect, useState } from "react";
import "./OffersScreen.css";   // <-- NEW

const offersDict = {
  en: {
    flowLabel: "Finding rides",
    title: "Step 4 · Select an offer",
    available: "Available offers",
    waiting: "Waiting for offers…",
    noDrivers: "No drivers found. Try again.",
    reject: "Reject",
    accept: "Accept",
    currency: "Rs",
    minutes: "min",
    secondsSuffix: "s",
  },
  ur: {
    flowLabel: "رائیڈز تلاش کی جا رہی ہیں",
    title: "مرحلہ 4 · آفر منتخب کریں",
    available: "دستیاب آفرز",
    waiting: "آفرز کا انتظار کیا جا رہا ہے…",
    noDrivers: "کوئی ڈرائیور نہیں ملا، دوبارہ کوشش کریں۔",
    reject: "منظور نہیں",
    accept: "قبول کریں",
    currency: "روپے",
    minutes: "منٹ",
    secondsSuffix: "سیکنڈ",
  },
};

const OffersScreen = ({
  fare = 0,
  vehicle = "",
  onBack,
  onAccept,
  locale = "en",
}) => {
  const t = (key) => {
    return (offersDict[locale] && offersDict[locale][key]) || offersDict.en[key] || key;
  };

  const seedTemplates = [
    { id: 1, car: "Alto", etaMin: 4, duration: 12, mul: 1.0, add: 0 },
    { id: 2, car: "Cultus", etaMin: 6, duration: 14, mul: 1.05, add: 10 },
    { id: 3, car: "Corolla", etaMin: 5, duration: 10, mul: 1.08, add: 20 },
    { id: 4, car: "Civic", etaMin: 7, duration: 16, mul: 1.12, add: 30 },
  ];

  const [offers, setOffers] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setOffers([]);
    let i = 0;

    const arrival = setInterval(() => {
      if (i < seedTemplates.length) {
        const tpl = seedTemplates[i];
        const now = Date.now();
        const computedPrice = Math.max(
          Math.round((fare || 0) * tpl.mul) + tpl.add,
          1
        );

        setOffers((prev) => [
          ...prev,
          {
            id: tpl.id,
            car: tpl.car,
            etaMin: tpl.etaMin,
            duration: tpl.duration,
            addedAt: now,
            expiresAt: now + tpl.duration * 1000,
            price: computedPrice,
          },
        ]);
        i++;
      } else clearInterval(arrival);
    }, 1200);

    return () => clearInterval(arrival);
  }, [fare]);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setOffers((prev) => prev.filter((o) => o && o.expiresAt > Date.now()));
    }, 200);

    return () => clearInterval(id);
  }, []);

  const handleReject = (id) =>
    setOffers((prev) => prev.filter((o) => o.id !== id));

  const currency = t("currency");

  return (
    <div className="offers-container">

      {/* Back button */}
      <div className="offers-back-row">
        <button className="back-chip" onClick={onBack}>
          <span className="back-arrow">⟵</span>
          <span className="back-text">
            {locale === "ur" ? "واپس جائیں" : "Go back"}
          </span>
        </button>
      </div>

      {/* Header */}
      <section className="offers-header">
        <span className="flow-label">{t("flowLabel")}</span>
        <h1 className="header-title">{t("title")}</h1>
      </section>

      <section className="offers-list-section">
        <h2 className="section-heading">{t("available")}</h2>

        {offers.length === 0 && (
          <p className="offers-waiting">{t("waiting")}</p>
        )}

        {offers.map((o) => {
          if (!o) return null;

          const now = Date.now();
          const remainingMs = Math.max(o.expiresAt - now, 0);
          const remainingSec = Math.ceil(remainingMs / 1000);
          const pct = Math.max(
            Math.min((remainingMs / (o.duration * 1000)) * 100, 100),
            0
          );

          return (
            <div key={o.id} className="offer-card">

              <div className="offer-avatar">👤</div>

              <div className="offer-info">
                <div className="offer-top">
                  <div>
                    <div className="car-name">{o.car}</div>
                    <div className="eta-text">
                      {o.etaMin} {t("minutes")}
                    </div>
                  </div>
                  <div className="price-text">
                    {currency} {o.price}
                  </div>
                </div>

                <div className="offer-buttons">
                  <button className="reject-btn" onClick={() => handleReject(o.id)}>
                    {t("reject")}
                  </button>

                  <button
                    className="accept-btn"
                    onClick={() =>
                      onAccept({ ...o, etaMinutes: o.etaMin })
                    }
                  >
                    {t("accept")}
                  </button>
                </div>

                <div className="offer-timer-row">
                  <div className="timer-bar">
                    <div
                      className="timer-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className={`timer-seconds ${remainingSec <= 3 ? "urgent" : ""}`}>
                    {locale === "ur"
                      ? `${remainingSec} ${t("secondsSuffix")}`
                      : `${remainingSec}${t("secondsSuffix")}`}
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {offers.length === 0 && (
          <p className="no-driver-text">{t("noDrivers")}</p>
        )}
      </section>
    </div>
  );
};

export default OffersScreen;

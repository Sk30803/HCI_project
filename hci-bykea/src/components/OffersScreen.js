// src/components/OffersScreen.js
import React, { useEffect, useState } from "react";

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

  // incremental arrival -> compute price from fare
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
      } else {
        clearInterval(arrival);
      }
    }, 1200);
    return () => clearInterval(arrival);
  }, [fare]);

  // tick for bars + purge expired
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

      <section className="ride-section">
        <h2 className="section-heading">{t("available")}</h2>
        {offers.length === 0 && (
          <p style={{ fontSize: 13, color: "#7b8190" }}>{t("waiting")}</p>
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
            <div
              key={o.id}
              className="vehicle-card vehicle-card-large"
              style={{ marginBottom: 14 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    background: "#e9eef3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9aa3b2",
                    fontWeight: 700,
                  }}
                >
                  Avatar
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>
                        {o.car}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7180",
                          marginTop: 4,
                        }}
                      >
                        {o.etaMin} {t("minutes")}
                      </div>
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 800 }}>
                      {currency} {o.price}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => handleReject(o.id)}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: 999,
                        border: "1px solid #dde1ea",
                        background: "#f8fafc",
                        fontWeight: 700,
                      }}
                    >
                      {t("reject")}
                    </button>

                    <button
                      onClick={() => onAccept(o)}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: 999,
                        border: "none",
                        background: "#0f9d58",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {t("accept")}
                    </button>
                  </div>

                  {/* progress + seconds */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 12,
                        borderRadius: 8,
                        background: "#222",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${pct}%`,
                          background: "linear-gradient(90deg,#ffe44d,#ffd800)",
                          transition: "width 180ms linear",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        minWidth: 48,
                        textAlign: "right",
                        fontWeight: 700,
                        color:
                          remainingSec <= 3 ? "#ff5252" : "#333",
                      }}
                    >
                      {locale === "ur"
                        ? `${remainingSec} ${t("secondsSuffix")}`
                        : `${remainingSec}${t("secondsSuffix")}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {offers.length === 0 && (
          <p
            style={{
              marginTop: 16,
              fontSize: 13,
              color: "#d93025",
              fontWeight: 600,
            }}
          >
            {t("noDrivers")}
          </p>
        )}
      </section>
    </div>
  );
};

export default OffersScreen;

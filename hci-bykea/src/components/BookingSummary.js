import React, { useEffect, useState } from "react";
import DriverMapPreview from "./DriverMapPreview";

const dict = {
  en: {
    flowLabel: "Ride summary",
    title: "Booking confirmed",
    tripDetails: "Trip details",
    pickup: "Pick-up",
    fareLabel: "Fare",
    dropoff: "Drop-off",
    vehicle: "Vehicle",
    eta: "ETA",
    arriving: "Arriving",
    seconds: "s",
    minutes: "min",
    trackDriver: "Track your driver",
    hideMap: "Hide map preview",
    tapExpand: "Tap to expand",
    tapPreview: "Tap to view small preview",
    open: "Open",
    cancel: "Cancel ride",
    share: "Share",
  },
  ur: {
    flowLabel: "رائیڈ خلاصہ",
    title: "بکنگ کنفرم ہو گئی ہے",
    tripDetails: "سفر کی تفصیل",
    pickup: "پک اپ",
    fareLabel: "کرایہ",
    dropoff: "ڈراپ آف",
    vehicle: "گاڑی",
    eta: "پہنچنے کا وقت",
    arriving: "پہنچ گیا",
    seconds: "سیکنڈ",
    minutes: "منٹ",
    trackDriver: "ڈرائیور کو ٹریک کریں",
    hideMap: "نقشہ چھپائیں",
    tapExpand: "بڑا دیکھنے کے لیے ٹیپ کریں",
    tapPreview: "چھوٹا پری ویو دیکھنے کے لیے ٹیپ کریں",
    open: "کھولیں",
    cancel: "رائڈ منسوخ کریں",
    share: "شیئر کریں",
  },
};

const BookingSummary = ({
  pickup,
  dropoff,
  vehicle,
  fare,
  acceptedOffer,
  onCancel,
  onShare,
  onCall,
  locale = "en",
}) => {
  const t = (key) => {
    return (dict[locale] && dict[locale][key]) || dict.en[key] || key;
  };

  const initialMinutes =
    acceptedOffer && acceptedOffer.eta
      ? Number(String(acceptedOffer.eta).replace(/\D/g, "")) || 0
      : 0;

  const [remainingSec, setRemainingSec] = useState(initialMinutes * 60);
  const [showMapPreview, setShowMapPreview] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setRemainingSec((s) => Math.max(s - 1, 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => setRemainingSec(initialMinutes * 60), [acceptedOffer]);

  const prettyEta = () => {
    if (remainingSec <= 0) return t("arriving");
    if (remainingSec < 60)
      return `${remainingSec} ${t("seconds")}`;
    return `${Math.ceil(remainingSec / 60)} ${t("minutes")}`;
  };

  return (
    <div className="ride-screen">
      <section className="ride-section ride-header-card">
        <span className="ride-flow-label">{t("flowLabel")}</span>
        <h1 className="ride-title">{t("title")}</h1>
      </section>

      <section className="ride-section summary-card">
        <p className="summary-title">{t("tripDetails")}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <div>
            <div className="summary-label">{t("pickup")}</div>
            <div className="summary-value">{pickup}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="summary-label">{t("fareLabel")}</div>
            <div className="summary-value">Rs {fare}</div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="summary-label">{t("dropoff")}</div>
          <div className="summary-value">{dropoff}</div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="summary-label">{t("vehicle")}</div>
            <div className="summary-value">
              {acceptedOffer ? acceptedOffer.car : vehicle}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="summary-label">{t("eta")}</div>
            <div className="summary-value">{prettyEta()}</div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button
            className="pickup-row"
            onClick={() => setShowMapPreview((v) => !v)}
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "#eef2f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🗺️
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>
                  {showMapPreview ? t("hideMap") : t("trackDriver")}
                </div>
                <div style={{ fontSize: 12, color: "#6b7180" }}>
                  {showMapPreview ? t("tapExpand") : t("tapPreview")}
                </div>
              </div>
            </div>
            <div style={{ color: "#0f9d58", fontWeight: 700 }}>
              {t("open")}
            </div>
          </button>

          {showMapPreview && (
            <div style={{ marginTop: 10 }}>
              <DriverMapPreview
                pickup={pickup}
                dropoff={dropoff}
                vehicle={acceptedOffer ? acceptedOffer.car : vehicle}
                remainingSec={remainingSec}
                onCall={() => onCall && onCall(acceptedOffer)}
              />
            </div>
          )}
        </div>
      </section>

      <section
        className="ride-section"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <button
          className="cancel-btn"
          onClick={onCancel}
          style={{ width: "100%" }}
        >
          {t("cancel")}
        </button>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="ride-primary-btn"
            onClick={onShare}
            style={{ width: 140, borderRadius: 999 }}
          >
            {t("share")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookingSummary;

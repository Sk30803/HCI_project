import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import RideScreen from "./components/RideScreen";
import PickupScreen from "./components/PickupScreen";
import DropoffScreen from "./components/DropoffScreen";
import VehicleScreen from "./components/VehicleScreen";
import FareScreen from "./components/FareScreen";
import OffersScreen from "./components/OffersScreen";
import BookingSummary from "./components/BookingSummary";
import AccessibilityPanel from "./components/AccessibilityPanel";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [pickupLocation, setPickupLocation] = useState("Current location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("bike");
  const [selectedFare, setSelectedFare] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

// at top of App()
const [accessibilityOn, setAccessibilityOn] = useState(() => {
  return localStorage.getItem("hci_accessibility") === "true";
});
const [locale, setLocale] = useState(() => localStorage.getItem("hci_locale") || "en");
const [accessPanelVisible, setAccessPanelVisible] = useState(false);

<button onClick={() => { setAccessibilityOn(true); setAccessPanelVisible(v => !v); }}>♿</button>


const DICT = {
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
    iba_main_campus: "IBA Main Campus",
    university_road: "University Road",
    home: "Home",
    gulshan_e_iqbal: "Gulshan-e-Iqbal",
    // add all keys your app uses...
  },
  ur: {
    title: "آپ کہاں جانا چاہتے ہیں؟",
    bookRide: "اپنا سفر بک کریں",
    parcel: "پارسل",
    cash: "کییش",
    wallet: "بائیکیا والیٹ",
    walletNote: "سفر اور پارسل کے لیے فوری ادائیگی کریں۔",
    recent: "حالیہ مقامات",
    viewAll: "تمام دیکھیں",
    addMoney: "رقم شامل کریں",
    iba_main_campus: "آئی بی اے مین کیمپس",
    university_road: "یونیورسٹی روڈ",
    home: "گھر",
    gulshan_e_iqbal: "گلشنِ اقبال",
    // add keys...
  },
};

// helper
const T = (key) => (DICT[locale] && DICT[locale][key]) || DICT.en[key] || key;


// persist
useEffect(() => localStorage.setItem("hci_accessibility", accessibilityOn), [accessibilityOn]);
useEffect(() => localStorage.setItem("hci_locale", locale), [locale]);

// read aloud util
const readAloud = (text, lang = null) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  // choose voice language if available
  if (lang) utter.lang = lang;
  // reduce speech rate slightly for clarity
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
};


  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onSelectService={(service) => {
              if (service === "ride") setCurrentScreen("rides");
            }}
            locale={locale}
            T={T}
            accessibilityOn={accessibilityOn}
            readAloud={readAloud}
          />
        );
        case "rides":
          return (
            <RideScreen
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
              onBack={() => setCurrentScreen("home")}
              onEditPickup={() => setCurrentScreen("pickup")}
              onEditDropoff={() => setCurrentScreen("dropoff")}
              onContinue={() => setCurrentScreen("vehicle")}
              
            />
          );

          case "vehicle":
  return (
    <VehicleScreen
      selectedVehicle={selectedVehicle}
      onBack={() => setCurrentScreen("rides")}
      onSelectVehicle={(v) => setSelectedVehicle(v)}
      onContinue={() => setCurrentScreen("fare")}
    />
  );

  case "offers":
  return (
    <OffersScreen
      fare={selectedFare}
      vehicle={selectedVehicle}
      onBack={() => setCurrentScreen("fare")}
      onAccept={(offer) => {
        setSelectedOffer(offer);
        setCurrentScreen("summary");
      }}
    />
  );



  case "fare":
  return (
    <FareScreen
      selectedVehicle={selectedVehicle}
      onBack={() => setCurrentScreen("vehicle")}
      onConfirmFare={(fare) => {
        setSelectedFare(fare);      // ← IMPORTANT: store user's fare
        console.log("Fare selected:", fare);
        setCurrentScreen("offers");
      }}
    />
  );
  

      case "pickup":
        return (
          <PickupScreen
            selectedPickup={pickupLocation}
            onBack={() => setCurrentScreen("rides")}
            onSelectPickup={(loc) => {
              setPickupLocation(loc);
              setCurrentScreen("rides");
            }}
          />
        );

        case "dropoff":
          return (
            <DropoffScreen
              selectedDropoff={dropoffLocation}
              onBack={() => setCurrentScreen("rides")}
              onSelectDropoff={(loc) => {
                setDropoffLocation(loc);
                setCurrentScreen("rides");
              }}
            />
          );

          case "summary":
            return (
              <BookingSummary
                pickup={pickupLocation}
                dropoff={dropoffLocation}
                vehicle={selectedVehicle}
                fare={selectedFare}
                acceptedOffer={selectedOffer}
                onCancel={() => { setSelectedOffer(null); setCurrentScreen("home"); }}
                onShare={() => { navigator.clipboard?.writeText("Ride details..."); alert("Copied"); }}
              />
            );
          


      case "wallet":
        return <div className="placeholder-screen">Wallet screen (coming soon)</div>;
      case "profile":
        return <div className="placeholder-screen">Profile & Settings (coming soon)</div>;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app" dir={locale === "ur" ? "rtl" : "ltr"}>
      <header className="app-header">
        <button className="header-icon-button" aria-label="Open menu">
          ☰
        </button>
        <div className="header-location">
          <span className="location-label">Current area</span>
          <span className="location-value">Karachi, Pakistan ▾</span>
        </div>
        <button className="header-icon-button" aria-label="Call support">
          📞
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {/* header (inside .app-header) */}
    <button
      title="Accessibility"
      onClick={() => {
        // toggle accessibility mode + panel
        setAccessibilityOn(true);
        setAccessPanelVisible((v) => !v);
      }}
      aria-pressed={accessPanelVisible}
      aria-label="Accessibility options"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: 20,
        padding: 8,
      }}
    >
      ♿
    </button>
  </div>

      </header>

      {/* Accessibility dropdown anchored to header */}
      {accessibilityOn && (
        <div
          className="access-panel-wrapper"
          style={{ position: "relative" }} /* wrapper that anchors absolute child */
        >
          <AccessibilityPanel
            visible={accessPanelVisible}
            onClose={() => setAccessPanelVisible(false)}
            locale={locale}
            setLocale={setLocale}
            readAloud={(txt) => readAloud(txt, locale === "ur" ? "ur-PK" : "en-US")}
          />
        </div>
      )}


      <main className="app-main">{renderScreen()}</main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className={`nav-item ${currentScreen === "home" ? "nav-item--active" : ""}`}
          onClick={() => setCurrentScreen("home")}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button
          className={`nav-item ${
            currentScreen === "rides" ||
            currentScreen === "pickup" ||
            currentScreen === "dropoff" ||
            currentScreen === "vehicle"
            ? "nav-item--active"
            : ""
          }`}
          onClick={() => setCurrentScreen("rides")}
        >
          <span className="nav-icon">🛵</span>
          <span className="nav-label">Rides</span>
        </button>
        <button
          className={`nav-item ${currentScreen === "wallet" ? "nav-item--active" : ""}`}
          onClick={() => setCurrentScreen("wallet")}
        >
          <span className="nav-icon">💳</span>
          <span className="nav-label">Wallet</span>
        </button>
        <button
          className={`nav-item ${currentScreen === "profile" ? "nav-item--active" : ""}`}
          onClick={() => setCurrentScreen("profile")}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </button>
      </nav>


    </div>
    
  );
}

export default App;

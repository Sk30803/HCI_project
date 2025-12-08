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
import ParcelScreen from "./components/ParcelScreen";
import WalletScreen from "./components/WalletScreen";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [pickupLocation, setPickupLocation] = useState("Current location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("bike");
  const [selectedFare, setSelectedFare] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [paymentMethod,setPaymentMethod] = useState("cash");
  const [isListening, setIsListening] = useState(false);


  const baseFares = {
    bike: 180,
    rickshaw: 260,
    car: 420,
    "ac-car": 480,
  };

  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognitionRef = React.useRef(null);

const handleVoiceCommandRef = React.useRef(null);


useEffect(() => {
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;

  recognition.onstart = () => setIsListening(true);
  recognition.onend = () => setIsListening(false);
  recognition.onerror = () => setIsListening(false);

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript.toLowerCase();
    console.log("VOICE HEARD:", text);   // 👈 ADD THIS
    if (handleVoiceCommandRef.current) {
      handleVoiceCommandRef.current(text);
    }
  };

  recognitionRef.current = recognition;
}, []); // ✅ keep empty dependency array


const startListening = () => {
  if (!recognitionRef.current) {
    alert("Voice not supported");
    return;
  }
  recognitionRef.current.start();
};

const stopListening = () => {
  recognitionRef.current?.stop();
};

const getNumberFromSpeech = (text) => {
  if (text.includes("one") || text.includes("1")) return 1;
  if (text.includes("two") || text.includes("2")) return 2;
  if (text.includes("three") || text.includes("3")) return 3;
  if (text.includes("four") || text.includes("4")) return 4;
  if (text.includes("five") || text.includes("5")) return 5;
  return null;
};

const handleVoiceCommand = (text) => {
  const n = getNumberFromSpeech(text);
  if (!n) return;

  switch (currentScreen) {
    case "home":
      if (n === 1) setCurrentScreen("rides");
      if (n === 2) setCurrentScreen("parcel");
      if (n === 3) setCurrentScreen("wallet");
      break;

    case "rides":
      if (n === 1) setCurrentScreen("pickup");
      if (n === 2) setCurrentScreen("dropoff");
      if (n === 3) setCurrentScreen("vehicle");
      break;

    case "vehicle":
      if (n === 1) setSelectedVehicle("bike");
      if (n === 2) setSelectedVehicle("rickshaw");
      if (n === 3) setSelectedVehicle("car");
      if (n === 4) setSelectedVehicle("ac-car");
      if (n === 5) setCurrentScreen("fare");
      break;

    case "fare":
      if (n === 1) setCurrentScreen("offers");
      break;

    case "parcel":
      if (n === 4) setCurrentScreen("home");
      break;

    case "wallet":
      if (n === 1) alert("Add money (prototype)");
      if (n === 2) setCurrentScreen("home");
      break;

    default:
      break;
  }
};

handleVoiceCommandRef.current = handleVoiceCommand;
// at top of App()
const [accessibilityOn, setAccessibilityOn] = useState(() => {
  return localStorage.getItem("hci_accessibility") === "true";
});
const [locale, setLocale] = useState(() => localStorage.getItem("hci_locale") || "en");
//const [accessPanelVisible, setAccessPanelVisible] = useState(false);

const getScreenSummary = () => {
  // helper to choose english/urdu text quickly; prefer T if you have it
  const tr = (en, ur) => (locale === "ur" ? ur : en);
  const vc = isListening; // voice commands active

  switch (currentScreen) {
    case "home":
      if (vc) {
        return tr(
          "Voice commands are ON. Say 1 to book a ride, 2 to deliver a parcel, 3 to open Bykea Wallet.",
          "وائس کمانڈ آن ہے۔ ایک بولیں رائیڈ بک کرنے کے لیے، دو بولیں پارسل بھیجنے کے لیے، تین بولیں بائیکیا والیٹ کھولنے کے لیے۔"
        );
      }
      return tr(
        "You are on the Home screen. You can book a ride, deliver a parcel, send cash, or add money to your Bykea wallet.",
        "آپ ہوم اسکرین پر ہیں۔ آپ اپنا سفر بک کر سکتے ہیں، پارسل بھیج سکتے ہیں، رقم بھیج سکتے ہیں، یا بائیکیا والیٹ میں رقم شامل کر سکتے ہیں۔"
      );

    case "rides":
      if (vc) {
        return tr(
          "Voice commands are ON. Say 1 to edit pickup, 2 to edit dropoff, 3 to continue and choose a vehicle.",
          "وائس کمانڈ آن ہے۔ ایک بولیں پک اپ بدلنے کے لیے، دو بولیں ڈراپ آف بدلنے کے لیے، تین بولیں گاڑی منتخب کرنے کے لیے آگے بڑھنے کے لیے۔"
        );
      }
      return tr(
        `You are on the Ride screen. Pickup: ${pickupLocation || "current location"}. Destination: ${dropoffLocation || "not set yet"}. Tap continue to choose a vehicle.`,
        `آپ رائیڈ اسکرین پر ہیں۔ پک اپ: ${pickupLocation || "موجودہ مقام"}۔ منزل: ${dropoffLocation || "ابھی طے نہیں"}. جاری رکھنے کے لیے کنٹینیو کریں۔`
      );

    case "pickup":
      return tr(
        "You are on the pickup screen. Search or choose your pickup location.",
        "آپ پک اپ اسکرین پر ہیں۔ اپنا پک اپ مقام تلاش کریں یا نقشے سے منتخب کریں۔"
      );

    case "dropoff":
      return tr(
        "You are on the drop-off screen. Search or choose your destination.",
        "آپ ڈراپ آف اسکرین پر ہیں۔ اپنا منزل تلاش کریں یا نقشے سے منتخب کریں۔"
      );

    case "vehicle":
      const minFare = baseFares[selectedVehicle] || 0;
      if (vc) {
        return tr(
          "Say 1 to choose bike. 2 to choose rickshaw. 3 for Car. 4 for Ac-Car",
          "وائس کمانڈ آن ہے۔ ایک بولیں پک اپ بدلنے کے لیے، دو بولیں ڈراپ آف بدلنے کے لیے، تین بولیں گاڑی منتخب کرنے کے لیے آگے بڑھنے کے لیے۔"
        );
      }
      return tr(
        `Choose vehicle. Selected: ${selectedVehicle || "none"}. Recommended minimum fare is Rs ${minFare || "—"}.`,
        `گاڑی منتخب کریں۔ منتخب شدہ: ${selectedVehicle || "کوئی نہیں"}. کم از کم کرایہ Rs ${selectedFare || "—"}.`
      );

    case "fare":
      if (vc) {
        return tr(
          'Say 1 to Continue'
        )
      }
      return tr(
        `Set your fare. Current value is Rs ${selectedFare || "—"}. your current payment method. ${paymentMethod||"—"}.  Continue to get driver offers.`,
        `اپنا کرایہ مقرر کریں۔ موجودہ رقم Rs ${selectedFare || "—"}. ادائیگی کا طریقہ منتخب کریں اور ڈرائیور آفرز دیکھیں۔`
      );

    case "offers":
      return tr(
        `Driver offers are incoming. You offered Rs ${selectedFare || "—"}. Tap accept on any offer to confirm.`,
        `ڈرائیور آفرز آرہی ہیں۔ آپ نے Rs ${selectedFare || "—"} کی پیشکش کی ہے۔ قبول کرنے کے لیے آفر پر Accept کریں۔`
      );

    case "summary":
      return tr(
        `Booking confirmed. PickUp Location.${pickupLocation}. Dropoff: ${dropoffLocation}. Vehicle: ${selectedOffer?.car || selectedVehicle || "—"}. Fare Rs ${selectedFare || "—"}. Estimated arrival ${selectedOffer?.etaMinutes
          ? `${selectedOffer.etaMinutes} min`
          : "-"}.`,
        `بکنگ کنفرم ہو گئی ہے۔ گاڑی: ${selectedOffer?.car || selectedVehicle || "—"}. کرایہ Rs ${selectedFare || "—"}. متوقع آمد ${selectedOffer?.eta || "-"}.`
      );

    default:
      return tr(
        "You are in the app. Use the navigation to go to different screens.",
        "آپ ایپ میں ہیں۔ مختلف اسکرینز پر جانے کے لیے نیویگیشن استعمال کریں۔"
      );
  }
};


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
              if (service === "parcel") setCurrentScreen("parcel");
              if (service === "wallet") setCurrentScreen("wallet");
            }}
            locale={locale}
            T={T}
            accessibilityOn={accessibilityOn}
            readAloud={readAloud}
          />
        );

        case "parcel":
        return (
          <ParcelScreen
            onBack={() => setCurrentScreen("home")}
            onContinue={() => {
              alert("Parcel flow complete (prototype)");
              setCurrentScreen("home");
            }}
            locale={locale}
          />
        );

      case "wallet":
        return (
          <WalletScreen
            locale={locale}
            onBack={() => setCurrentScreen("home")}
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
              locale={locale}
              accessibilityOn={accessibilityOn}
              readAloud={readAloud}
            />
          );

          case "vehicle":
  return (
    <VehicleScreen
      selectedVehicle={selectedVehicle}
      onBack={() => setCurrentScreen("rides")}
      onSelectVehicle={(v) => {
        setSelectedVehicle(v);
        setSelectedFare(baseFares[v] || null);  // <-- add this line
      }}
      onContinue={() => setCurrentScreen("fare")}
      locale={locale}
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
      locale={locale}
    />
  );



  case "fare":
  return (
    <FareScreen
      selectedVehicle={selectedVehicle}
      onBack={() => setCurrentScreen("vehicle")}
      onConfirmFare={(fare) => {
        setPaymentMethod(paymentMethod);
        setSelectedFare(fare);      // ← IMPORTANT: store user's fare
        setCurrentScreen("offers");
      }}
      onFareChange={(fare) => setSelectedFare(fare)}   // <-- add this
      locale={locale}
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
            locale={locale}
            T={T}
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
              locale={locale}
              T={T}
              accessibilityOn={accessibilityOn}
              readAloud={readAloud}
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
                locale={locale}
              />
            );
          
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

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {/* header (inside .app-header) */}
    <button
      title="Accessibility"
      onClick={() => {
        // toggle accessibility mode + panel
        //setAccessibilityOn(true);
        //setAccessPanelVisible((v) => !v);
      }}
      //aria-pressed={accessPanelVisible}
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
      {/* toggle switch */}
    <label className="access-toggle">
      <input
        type="checkbox"
        checked={accessibilityOn}
        onChange={(e) => setAccessibilityOn(e.target.checked)}
      />
      <span className="access-toggle-slider" />
    </label>

  </div>

      </header>

      {/* Accessibility dropdown anchored to header */}
      {accessibilityOn && (
        <div
          className="access-panel-wrapper"
          style={{ position: "relative" }} /* wrapper that anchors absolute child */
        >
          <AccessibilityPanel
            startListening={startListening}
            stopListening={stopListening}
            isListening={isListening}
            visible={true}
            onClose={() => setAccessibilityOn(false)}
            locale={locale}
            setLocale={setLocale}
            readCurrent={() => readAloud(getScreenSummary(), "en-US")} // readAloud(text, lang)
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

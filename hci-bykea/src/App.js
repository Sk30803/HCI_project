import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import RideScreen from "./components/RideScreen";
import PickupScreen from "./components/PickupScreen";
import DropoffScreen from "./components/DropoffScreen";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [pickupLocation, setPickupLocation] = useState("Current location");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onSelectService={(service) => {
              if (service === "ride") setCurrentScreen("rides");
            }}
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

      case "wallet":
        return <div className="placeholder-screen">Wallet screen (coming soon)</div>;
      case "profile":
        return <div className="placeholder-screen">Profile & Settings (coming soon)</div>;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app">
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
      </header>

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
            currentScreen === "rides" || currentScreen === "pickup" ? "nav-item--active" : ""
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

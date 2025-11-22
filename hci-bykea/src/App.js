import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      // we’ll add these screens later
      case "rides":
        return <div className="placeholder-screen">Rides screen (coming soon)</div>;
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
      {/* Top Bar */}
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

      {/* Main Content */}
      <main className="app-main">{renderScreen()}</main>

      {/* Bottom navigation */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className={`nav-item ${currentScreen === "home" ? "nav-item--active" : ""}`}
          onClick={() => setCurrentScreen("home")}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button
          className={`nav-item ${currentScreen === "rides" ? "nav-item--active" : ""}`}
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

import React, { useEffect, useState } from "react";

/**
 * Props:
 * - visible (boolean)
 * - onClose()
 * - locale, setLocale
 * - readAloud(text)
 */
export default function AccessibilityPanel({
  visible,
  onClose,
  locale,
  setLocale,
  readAloud,
  readCurrent,
  startListening,
  stopListening,
  isListening,
}) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    if (!locale) setLocale("en");
    if (!("speechSynthesis" in window)) setVoiceEnabled(false);
  }, []); // eslint-disable-line

  if (!visible) return null;

  return (
    <div
      className="accessibility-panel"
      role="dialog"
      aria-label="Accessibility options"
      style={{
        position: "absolute",
        top: "56px", // appears right under header
        right: "12px",
        width: "300px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        padding: "12px",
        zIndex: 9999,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Accessibility</strong>
        <button
          onClick={onClose}
          aria-label="Close accessibility panel"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ✕
        </button>
      </div>

      {/* LANGUAGE SWITCH */}
      <div style={{ marginTop: 10 }}>
        <label
          style={{ display: "block", fontWeight: 700, marginBottom: 6 }}
        >
          Language
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setLocale("en")}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              background: locale === "en" ? "#0f9d58" : "#f1f3f9",
              color: locale === "en" ? "#fff" : "#222",
            }}
          >
            English
          </button>

          <button
            onClick={() => setLocale("ur")}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              background: locale === "ur" ? "#0f9d58" : "#f1f3f9",
              color: locale === "ur" ? "#fff" : "#222",
            }}
          >
            اردو
          </button>
        </div>
      </div>

      {/* READ ALOUD */}
      <div style={{ marginTop: 12 }}>
        <label
          style={{ display: "block", fontWeight: 700, marginBottom: 6 }}
        >
          Read aloud
        </label>

        <div style={{ display: "flex", gap: 8 }}>
        <button
        disabled={!voiceEnabled}
        onClick={() => {
          // call the read-current-screen function passed from App
          if (typeof readCurrent === "function") {
            readCurrent();
          } else {
            // fallback: use simple text
            if (locale === "en") readAloud("Reading the screen aloud.");
          }
        }}
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          background: locale !== "en" ? "#bdbdbd" : "#0f9d58",
          color: "#fff",
          cursor: locale !== "en" ? "not-allowed" : "pointer",
        }}
      >
        Read screen
        </button>


          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            style={{
              padding: 10,
              borderRadius: 8,
              background: "#eee",
            }}
          >
            Stop
          </button>
        </div>
      </div>

      {/* VOICE COMMANDS PLACEHOLDER */}
      <div style={{ marginTop: 12 }}>
        <label
          style={{ display: "block", fontWeight: 700, marginBottom: 6 }}
        >
          Voice commands (coming)
        </label>

        <button
          onClick={startListening} disabled={isListening}
          style={{
            padding: 10,
            borderRadius: 8,
            width: "100%",
            background: "#f1f3f9",
            color: "#999",
          }}
        >
          Start voice command (coming soon)
        </button>

        <button onClick={stopListening} disabled={!isListening}>
          ⏹ Stop listening
        </button>

      </div>
    </div>
  );
}

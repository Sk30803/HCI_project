import React, { useEffect, useState } from "react";

/**
 * Props:
 * - visible (boolean)
 * - onClose()
 * - locale, setLocale (string 'en'|'ur')
 * - readAloud(text)
 */
export default function AccessibilityPanel({ visible, onClose, locale, setLocale, readAloud }) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    // ensure default locale
    if (!locale) setLocale("en");
    // check for speech synthesis
    if (!("speechSynthesis" in window)) setVoiceEnabled(false);
  }, []); // eslint-disable-line

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      right: 12,
      bottom: 90,
      width: 300,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      padding: 12,
      zIndex: 9999
    }} role="dialog" aria-label="Accessibility options">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Accessibility</strong>
        <button onClick={onClose} aria-label="Close accessibility panel">✕</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Language</label>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setLocale("en")}
            style={{ flex: 1, padding: 8, borderRadius: 8, background: locale === "en" ? "#0f9d58" : "#f1f3f9", color: locale === "en" ? "#fff" : "#222" }}
          >English</button>

          <button
            onClick={() => setLocale("ur")}
            style={{ flex: 1, padding: 8, borderRadius: 8, background: locale === "ur" ? "#0f9d58" : "#f1f3f9", color: locale === "ur" ? "#fff" : "#222" }}
          >اردو</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Read aloud</label>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            disabled={!voiceEnabled}
            onClick={() => readAloud("This will read the current screen content out loud.")}
            style={{ flex: 1, padding: 10, borderRadius: 8, background: "#0f9d58", color: "#fff" }}
          >
            Read screen
          </button>

          <button
            onClick={() => {
              // stop
              if (window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            style={{ padding: 10, borderRadius: 8 }}
          >
            Stop
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Voice commands (coming)</label>
        <button disabled style={{ padding: 10, borderRadius: 8, width: "100%", background: "#f1f3f9" }}>
          Start voice command (coming soon)
        </button>
      </div>
    </div>
  );
}

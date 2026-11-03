import { useState } from "react";

interface HomeProps {
  onNavigate: (page: "player-login" | "host-game") => void;
}

// Home screen component
export function Home({ onNavigate }: HomeProps) {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#85c5e5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Georgia, serif",
      userSelect: "none"
    }}>
      {/* Top Black Bar */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
          BUZZER
        </span>
        <button 
          onClick={() => onNavigate("host-game")}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "6px 20px",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Animateur
        </button>
      </div>

      {/* Central Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        gap: "30px"
      }}>
        <h1 style={{
          color: "#ffffff",
          fontSize: "40px",
          fontWeight: "normal",
          fontStyle: "italic",
          letterSpacing: "2px",
          margin: 0,
          textAlign: "center"
        }}>
          BUZZER
        </h1>

        {/* Buzzer Illustration */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          <div style={{ display: "flex", gap: "24px", marginBottom: "8px" }}>
            <div style={{ width: "4px", height: "12px", backgroundColor: "#ffffff", borderRadius: "2px", transform: "rotate(-25deg)" }}></div>
            <div style={{ width: "4px", height: "16px", backgroundColor: "#ffffff", borderRadius: "2px" }}></div>
            <div style={{ width: "4px", height: "12px", backgroundColor: "#ffffff", borderRadius: "2px", transform: "rotate(25deg)" }}></div>
          </div>
          <div style={{
            width: "140px",
            height: "45px",
            backgroundColor: "#2bc4ad",
            borderRadius: "50%",
            border: "3px solid #1c8877",
            boxShadow: "inset 0 6px 10px rgba(255,255,255,0.4), 0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 2
          }}></div>
          <div style={{
            width: "180px",
            height: "55px",
            backgroundColor: "#1c3548",
            borderRadius: "50%",
            marginTop: "-25px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            zIndex: 1
          }}></div>
        </div>

        <button 
          onClick={() => onNavigate("player-login")}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "8px 36px",
            fontSize: "16px",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            marginTop: "10px"
          }}
        >
          Jouer
        </button>
      </div>

      {/* Bottom Black Bar */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center",
        padding: "10px",
        fontSize: "14px",
        fontStyle: "italic"
      }}>
        Créé par l'équipe buzzer - 2026
      </div>
    </div>
  );
}

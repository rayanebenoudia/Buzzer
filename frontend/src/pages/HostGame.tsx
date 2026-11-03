import { useState } from "react";

export function HostGame() {
  const [activeTab, setActiveTab] = useState<"game" | "leaderboard" | "members">("game");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  // Simulated data example
  const members = ["Player 1", "Player 2", "Player 3", "Player 4"];
  const leaderboard = [
    { name: "Player 1", score: 120 },
    { name: "Player 2", score: 90 },
    { name: "Player 3", score: 75 },
    { name: "Player 4", score: 40 },
  ];

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
      
      {/* 1. TOP BLACK BAR */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Logo + BUZZER Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#00bcd4",
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{ width: "22px", height: "9px", backgroundColor: "#ffffff", borderRadius: "4px" }}></div>
          </div>
          <span style={{ fontSize: "22px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
            BUZZER
          </span>
        </div>

        {/* Disconnect Button */}
        <button 
          onClick={() => alert("Host disconnected")}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "6px 20px",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
            cursor: "pointer"
          }}
        >
          Disconnect
        </button>
      </div>

      {/* 2. CENTRAL CONTENT (2-COLUMN LAYOUT) */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 60px",
        gap: "60px"
      }}>
        
        {/* Left Column: Title + Buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "300px"
        }}>
          <h1 style={{
            color: "#ffffff",
            fontSize: "42px",
            fontWeight: "normal",
            fontStyle: "italic",
            letterSpacing: "2px",
            marginBottom: "30px"
          }}>
            BUZZER
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
            {/* Start Game Button */}
            <button 
              onClick={() => {
                setActiveTab("game");
                setIsGameStarted(true);
              }}
              style={{
                width: "100%",
                backgroundColor: activeTab === "game" ? "#dfccf7" : "#e2c2f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "25px",
                padding: "12px 20px",
                fontSize: "20px",
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                textAlign: "center",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                boxShadow: activeTab === "game" ? "inset 0 2px 4px rgba(0,0,0,0.2)" : "none"
              }}
            >
              {isGameStarted ? "Game in progress" : "Start game"}
            </button>

            {/* Leaderboard Button */}
            <button 
              onClick={() => setActiveTab("leaderboard")}
              style={{
                width: "100%",
                backgroundColor: activeTab === "leaderboard" ? "#153a52" : "#1e5272",
                color: "#ffffff",
                border: "none",
                borderRadius: "25px",
                padding: "12px 20px",
                fontSize: "20px",
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              Leaderboard
            </button>

            {/* Members Button */}
            <button 
              onClick={() => setActiveTab("members")}
              style={{
                width: "100%",
                backgroundColor: activeTab === "members" ? "#153a52" : "#1e5272",
                color: "#ffffff",
                border: "none",
                borderRadius: "25px",
                padding: "12px 20px",
                fontSize: "20px",
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              Members ({members.length})
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Frame */}
        <div style={{
          flex: 1,
          maxWidth: "500px",
          minHeight: "320px",
          backgroundColor: "#dfccf7",
          border: "4px solid #ffffff",
          boxSizing: "border-box",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          {activeTab === "game" && (
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "24px", marginTop: 0, marginBottom: "16px" }}>
                {isGameStarted ? "Question in progress" : "Game zone"}
              </h2>
              <p style={{ color: "#ffffff", fontSize: "16px" }}>
                {isGameStarted 
                  ? "The game has started! Waiting for players' answers..." 
                  : "Click 'Start game' to begin."}
              </p>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "24px", marginTop: 0, marginBottom: "16px" }}>
                Leaderboard
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {leaderboard.map((item, index) => (
                  <li key={index} style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.3)"
                  }}>
                    <span>{index + 1}. {item.name}</span>
                    <span>{item.score} pts</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "members" && (
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "24px", marginTop: 0, marginBottom: "16px" }}>
                Connected players
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {members.map((member, index) => (
                  <div key={index} style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "8px 12px",
                    borderRadius: "8px"
                  }}>
                    🟢 {member}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. BOTTOM BLACK BAR */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center",
        padding: "10px",
        fontSize: "14px",
        fontStyle: "italic"
      }}>
        Created by buzzer team - 2026
      </div>

    </div>
  );
}

export const HostDashboard = HostGame;

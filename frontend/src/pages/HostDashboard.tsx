import { useState } from "react";

interface HostGameProps {
  onBack: () => void;
}

// Host Game dashboard component
export function HostGame({ onBack }: HostGameProps) {
  const [activeTab, setActiveTab] = useState<"game" | "leaderboard" | "members">("game");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/games", {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error("Erreur création partie");
      }
      const data: { code: string } = await response.json();
      setGameCode(data.code);
      setIsGameStarted(true);
      setActiveTab("game");
    } catch (error) {
      console.error(error);
      alert("Impossible de créer la partie");
    } finally {
      setLoading(false);
    }
  };

  const members = ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4"];
  const leaderboard = [
    { name: "Joueur 1", score: 120 },
    { name: "Joueur 2", score: 90 },
    { name: "Joueur 3", score: 75 },
    { name: "Joueur 4", score: 40 },
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
      {/* Top Black Bar */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
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

        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={onBack}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "14px",
              fontFamily: "Georgia, serif",
              cursor: "pointer"
            }}
          >
            Retour
          </button>
          <button 
            onClick={() => alert("Animateur déconnecté")}
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
            Déconnecter
          </button>
        </div>
      </div>

      {/* Central Content */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 60px",
        gap: "60px"
      }}>
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
            <button 
              onClick={createGame} 
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: activeTab === "game" ? "#dfccf7" : "#e2c2f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "25px",
                padding: "12px 20px",
                fontSize: "20px",
                fontFamily: "Georgia, serif",
                cursor: loading ? "wait" : "pointer",
                textAlign: "center",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Création..." : isGameStarted ? "Partie en cours" : "Créer une partie"}
            </button>

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
              Classement
            </button>

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
              Membres ({members.length})
            </button>
          </div>
        </div>

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
                {isGameStarted ? "Question en cours" : "Salon de jeu"}
              </h2>
              
              {gameCode && (
                <div style={{ marginBottom: "16px" }}>
                  <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 6px 0" }}>Code de la partie</h3>
                  <h1 style={{ color: "#ffffff", fontSize: "36px", margin: 0, letterSpacing: "3px" }}>{gameCode}</h1>
                </div>
              )}

              <p style={{ color: "#ffffff", fontSize: "16px" }}>
                {isGameStarted 
                  ? "La partie a commencé ! En attente des joueurs..." 
                  : "Cliquez sur 'Créer une partie' pour générer un code de session."}
              </p>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "24px", marginTop: 0, marginBottom: "16px" }}>
                Classement
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
                Joueurs connectés
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

export const HostDashboard = HostGame;

import React, { useState, useEffect } from "react";

interface HostLobbyProps {
  roomCode: string;
  onStartGame: () => void;
  onBack: () => void;
}

export const HostLobby: React.FC<HostLobbyProps> = ({ roomCode, onStartGame, onBack }) => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`quiz_players_${roomCode}`) || "[]");
    setPlayers(stored);
    
    // Intervalle pour actualiser la liste des joueurs connectés en direct
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem(`quiz_players_${roomCode}`) || "[]");
      setPlayers(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [roomCode]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#60a5fa", fontFamily: "serif", margin: 0, justifyContent: "space-between", color: "#fff" }}>
      {/* Header haut */}
      <header style={{ background: "#000", color: "#fff", padding: "12px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "18px", background: "#2dd4bf", borderRadius: "12px", border: "1px solid #5eead4" }}></div>
          <span style={{ fontStyle: "italic", fontSize: "18px", letterSpacing: "1px" }}>BUZZER</span>
        </div>
        <button onClick={onBack} style={{ background: "#fff", color: "#000", border: "none", padding: "6px 18px", borderRadius: "20px", cursor: "pointer", fontFamily: "serif", fontSize: "14px", fontWeight: "bold" }}>
          Deconnexion
        </button>
      </header>

      {/* Contenu principal style maquette */}
      <main style={{ padding: "40px 60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 }}>
        <div style={{ fontStyle: "italic", fontSize: "36px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "40px", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          BUZZER
        </div>

        <div style={{ display: "flex", width: "100%", maxWidth: "900px", justifyContent: "space-between", alignItems: "center", gap: "50px" }}>
          {/* Section Code d acces à gauche */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "15px", flex: 1 }}>
            <h2 style={{ fontSize: "32px", fontWeight: "normal", fontStyle: "italic", margin: 0 }}>Code d acces</h2>
            <div style={{ fontSize: "48px", fontWeight: "bold", letterSpacing: "8px", fontStyle: "italic", background: "rgba(255,255,255,0.2)", padding: "10px 30px", borderRadius: "15px", border: "2px solid #fff" }}>
              {roomCode}
            </div>
            <div style={{ marginTop: "10px", fontSize: "16px", fontStyle: "italic" }}>
              Joueurs connectes : <b>{players.length}</b> ({players.join(", ") || "En attente..."})
            </div>
          </div>

          {/* Section QR Code à droite */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Simulation visuelle d un QR Code propre */}
            <div style={{ width: "180px", height: "180px", background: "#000", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px", padding: "10px" }}>
              {[1,1,1,0,1, 1,0,0,0,1, 1,1,1,0,1, 0,0,0,0,0, 1,1,1,1,1].map((val, i) => (
                <div key={i} style={{ background: val ? "#fff" : "#000" }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Bouton Continuer en bas */}
        <button 
          onClick={onStartGame} 
          style={{ marginTop: "50px", background: "transparent", color: "#fff", border: "none", fontSize: "28px", fontWeight: "bold", fontStyle: "italic", cursor: "pointer", letterSpacing: "2px", textShadow: "0 2px 4px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}>
          Continuer ➔
        </button>
      </main>

      {/* Footer bas */}
      <footer style={{ background: "#000", color: "#fff", textAlign: "center", padding: "12px", fontSize: "13px", fontStyle: "italic" }}>
        Equipe buzzer - 2026
      </footer>
    </div>
  );
};
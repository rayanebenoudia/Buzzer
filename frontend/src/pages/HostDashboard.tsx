import React, { useState, useEffect } from "react";
import { QUIZ_QUESTIONS } from "../data/questions";

interface HostDashboardProps {
  onBack: () => void;
}

export const HostDashboard: React.FC<HostDashboardProps> = ({ onBack }) => {
  const [roomCode, setRoomCode] = useState<string>("A1B2");
  const [players, setPlayers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"game" | "ranking" | "members">("game");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem(`quiz_qindex_${roomCode}`) || "0", 10);
  });
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`quiz_players_${roomCode}`) || "[]");
    setPlayers(stored);
  }, [roomCode]);

  const updateQuestionIndex = (newIndex: number) => {
    setCurrentQuestionIndex(newIndex);
    localStorage.setItem(`quiz_qindex_${roomCode}`, newIndex.toString());
    setShowAnswer(false);
    localStorage.setItem(`quiz_showanswer_${roomCode}`, "false");
  };

  const handleToggleAnswer = () => {
    const nextState = !showAnswer;
    setShowAnswer(nextState);
    localStorage.setItem(`quiz_showanswer_${roomCode}`, nextState.toString());
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const scores: { [key: string]: number } = JSON.parse(localStorage.getItem(`quiz_scores_${roomCode}`) || "{}");
  const sortedPlayers = [...players].sort((a, b) => (scores[b] || 0) - (scores[a] || 0));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#60a5fa", fontFamily: "serif", margin: 0, justifyContent: "space-between", color: "#000" }}>
      <header style={{ background: "#000", color: "#fff", padding: "12px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "18px", background: "#2dd4bf", borderRadius: "12px", border: "1px solid #5eead4" }}></div>
          <span style={{ fontStyle: "italic", fontSize: "18px", letterSpacing: "1px" }}>BUZZER</span>
        </div>
        <button onClick={onBack} style={{ background: "#fff", color: "#000", border: "none", padding: "6px 18px", borderRadius: "20px", cursor: "pointer", fontFamily: "serif", fontSize: "14px", fontWeight: "bold" }}>
          Deconnexion
        </button>
      </header>

      <main style={{ padding: "30px 50px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontStyle: "italic", fontSize: "32px", color: "#fff", marginBottom: "30px", fontWeight: "bold", letterSpacing: "2px", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          BUZZER
        </div>

        <div style={{ display: "flex", gap: "50px", alignItems: "flex-start", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "280px" }}>
            <button 
              onClick={() => { setGameStarted(true); setActiveTab("game"); }}
              style={{ background: "#e8d7f5", color: "#7c3aed", border: "none", padding: "16px 20px", borderRadius: "30px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", fontFamily: "serif", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", textAlign: "center" }}>
              {gameStarted ? "Tableau de jeu" : "Lancer la partie"}
            </button>
            <button 
              onClick={() => setActiveTab("ranking")}
              style={{ background: "#1e3a8a", color: "#fff", border: "none", padding: "16px 20px", borderRadius: "30px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", fontFamily: "serif", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", textAlign: "center" }}>
              Classement
            </button>
            <button 
              onClick={() => setActiveTab("members")}
              style={{ background: "#1e3a8a", color: "#fff", border: "none", padding: "16px 20px", borderRadius: "30px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", fontFamily: "serif", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", textAlign: "center" }}>
              Membres ({players.length})
            </button>
          </div>

          <div style={{ flex: 1, background: "#e9d5ff", border: "2px solid #fff", borderRadius: "10px", padding: "30px", minHeight: "350px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {activeTab === "game" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", fontSize: "14px", fontWeight: "bold", color: "#581c87", background: "rgba(124, 58, 237, 0.1)", padding: "8px 12px", borderRadius: "6px" }}>
                  <span>Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                  <span style={{ letterSpacing: "1px", background: "#7c3aed", color: "#fff", padding: "2px 8px", borderRadius: "4px" }}>Salon : {roomCode}</span>
                  <span>{currentQ.category}</span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", color: "#2e1065" }}>
                  {currentQ.question}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = idx === currentQ.correctAnswerIndex;
                    return (
                      <div key={idx} style={{ padding: "12px 15px", background: showAnswer && isCorrect ? "#bbf7d0" : "#fff", borderRadius: "8px", border: showAnswer && isCorrect ? "2px solid #16a34a" : "1px solid #d8b4fe", fontSize: "15px" }}>
                        <b>{String.fromCharCode(65 + idx)}.</b> {opt}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #d8b4fe", paddingTop: "15px" }}>
                  <button onClick={handleToggleAnswer} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                    {showAnswer ? "Masquer la reponse" : "Afficher la reponse"}
                  </button>
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                    <button onClick={() => updateQuestionIndex(currentQuestionIndex + 1)} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                      Question Suivante ➔
                    </button>
                  ) : (
                    <span style={{ fontWeight: "bold", color: "#16a34a" }}>Fin du Quiz !</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === "ranking" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#2e1065" }}>Classement en direct</h3>
                  <span style={{ fontSize: "14px", fontWeight: "bold", background: "#7c3aed", color: "#fff", padding: "4px 10px", borderRadius: "6px" }}>Salon : {roomCode}</span>
                </div>
                <ol style={{ fontSize: "18px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {sortedPlayers.map((p, idx) => (
                    <li key={idx} style={{ background: "#fff", padding: "10px 15px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                      <span>{idx + 1}. {p}</span>
                      <span style={{ fontWeight: "bold", color: "#16a34a" }}>{scores[p] || 0} pts</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === "members" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#2e1065" }}>Joueurs connectes</h3>
                  <span style={{ fontSize: "14px", fontWeight: "bold", background: "#7c3aed", color: "#fff", padding: "4px 10px", borderRadius: "6px" }}>Salon : {roomCode}</span>
                </div>
                <ul style={{ fontSize: "18px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {players.map((p, idx) => (
                    <li key={idx} style={{ background: "#fff", padding: "10px 15px", borderRadius: "8px" }}>
                      🟢 {p} (Connecté)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ background: "#000", color: "#fff", textAlign: "center", padding: "12px", fontSize: "13px", fontStyle: "italic" }}>
        Equipe buzzer - 2026
      </footer>
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { QUIZ_QUESTIONS } from "../data/questions";

interface PlayerGameProps {
  onBack: () => void;
}

export const PlayerGame: React.FC<PlayerGameProps> = ({ onBack }) => {
  const [joined, setJoined] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("A1B2");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      const code = roomCode.trim().toUpperCase();
      setJoined(true);
      const storedPlayers = JSON.parse(localStorage.getItem(`quiz_players_${code}`) || "[]");
      if (!storedPlayers.includes(playerName.trim())) {
        storedPlayers.push(playerName.trim());
        localStorage.setItem(`quiz_players_${code}`, JSON.stringify(storedPlayers));
      }
    }
  };

  // Synchronisation automatique de la question et de la révélation de la réponse
  useEffect(() => {
    if (!joined) return;
    const interval = setInterval(() => {
      const activeQIndex = parseInt(localStorage.getItem(`quiz_qindex_${roomCode}`) || "0", 10);
      const isAnswerRevealed = localStorage.getItem(`quiz_showanswer_${roomCode}`) === "true";

      if (activeQIndex !== currentQuestionIndex) {
        setCurrentQuestionIndex(activeQIndex);
        setSelectedOption(null);
        setHasSubmitted(false);
        setTimeLeft(15);
      }
      setShowAnswer(isAnswerRevealed);
    }, 500);
    return () => clearInterval(interval);
  }, [joined, roomCode, currentQuestionIndex]);

  useEffect(() => {
    if (joined && !hasSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [joined, hasSubmitted, timeLeft]);

  const handleValidation = () => {
    if (selectedOption !== null && !hasSubmitted) {
      setHasSubmitted(true);
      const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
      
      if (selectedOption === currentQ.correctAnswerIndex) {
        const scores = JSON.parse(localStorage.getItem(`quiz_scores_${roomCode}`) || "{}");
        const currentScore = scores[playerName] || 0;
        scores[playerName] = currentScore + 100 + (timeLeft * 5);
        localStorage.setItem(`quiz_scores_${roomCode}`, JSON.stringify(scores));
      }
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#60a5fa", fontFamily: "serif", margin: 0, justifyContent: "space-between", color: "#000" }}>
      <header style={{ background: "#000", color: "#fff", padding: "12px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "18px", background: "#2dd4bf", borderRadius: "12px", border: "1px solid #5eead4" }}></div>
          <span style={{ fontStyle: "italic", fontSize: "18px", letterSpacing: "1px" }}>BUZZER</span>
        </div>
        <button onClick={onBack} style={{ background: "#fff", color: "#000", border: "none", padding: "6px 18px", borderRadius: "20px", cursor: "pointer", fontFamily: "serif", fontSize: "14px", fontWeight: "bold" }}>
          Accueil
        </button>
      </header>

      <main style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 }}>
        <div style={{ fontStyle: "italic", fontSize: "32px", color: "#fff", marginBottom: "30px", fontWeight: "bold", letterSpacing: "2px" }}>
          BUZZER
        </div>

        {!joined ? (
          <div style={{ background: "#e9d5ff", border: "2px solid #fff", borderRadius: "12px", padding: "40px", width: "100%", maxWidth: "400px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#2e1065" }}>Rejoindre la partie</h2>
            <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input type="text" placeholder="Votre pseudo" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #d8b4fe", fontSize: "16px", outline: "none" }} />
              <input type="text" placeholder="Code du salon (ex: A1B2)" value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} maxLength={4} required style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #d8b4fe", fontSize: "16px", outline: "none", textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }} />
              <button type="submit" style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}>Valider et entrer</button>
            </form>
          </div>
        ) : (
          <div style={{ background: "#e9d5ff", border: "2px solid #fff", borderRadius: "12px", padding: "30px", width: "100%", maxWidth: "600px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "14px", fontWeight: "bold", color: "#581c87" }}>
              <span>Joueur : {playerName}</span>
              <span style={{ background: timeLeft <= 5 ? "#ef4444" : "#7c3aed", color: "#fff", padding: "2px 8px", borderRadius: "4px" }}>⏱️ {timeLeft}s</span>
              <span>Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            </div>
            
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#2e1065" }}>
              {currentQ.question}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;
                
                let bg = "#fff";
                let border = "1px solid #d8b4fe";
                if (showAnswer && isCorrect) {
                  bg = "#bbf7d0";
                  border = "2px solid #16a34a";
                } else if (isSelected) {
                  bg = "#c084fc";
                }

                return (
                  <button key={idx} onClick={() => !hasSubmitted && !showAnswer && setSelectedOption(idx)} style={{ padding: "12px 15px", background: bg, color: isSelected && !showAnswer ? "#fff" : "#000", borderRadius: "8px", border: border, fontSize: "15px", textAlign: "left", cursor: hasSubmitted || showAnswer ? "not-allowed" : "pointer", fontWeight: isSelected || (showAnswer && isCorrect) ? "bold" : "normal" }}>
                    <b>{String.fromCharCode(65 + idx)}.</b> {opt}
                  </button>
                );
              })}
            </div>

            <button onClick={handleValidation} disabled={selectedOption === null || hasSubmitted || showAnswer} style={{ width: "100%", background: hasSubmitted ? "#16a34a" : "#2563eb", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: selectedOption !== null && !hasSubmitted && !showAnswer ? "pointer" : "not-allowed" }}>
              {showAnswer ? "Réponse révélée" : hasSubmitted ? "Réponse enregistrée - En attente..." : "Valider"}
            </button>
          </div>
        )}
      </main>

      <footer style={{ background: "#000", color: "#fff", textAlign: "center", padding: "12px", fontSize: "13px", fontStyle: "italic" }}>
        Equipe buzzer - 2026
      </footer>
    </div>
  );
};
import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface HostGameProps {
  onBack: () => void;
  sessionCode?: string;
}

export function HostGame({ onBack, sessionCode }: HostGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [validatedRound, setValidatedRound] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8081/questions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleValidateAnswers = () => {
    setValidatedRound(true);
  };

  const handleNextQuestion = () => {
    setValidatedRound(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#85c5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: "24px",
        fontFamily: "Georgia, serif"
      }}>
        Chargement des questions pour l'animateur...
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

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
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            fontFamily: "Georgia, serif"
          }}
        >
          Retour
        </button>
        <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
          TABLEAU DE BORD ANIMATEUR {sessionCode ? `- Code : ${sessionCode}` : ""}
        </span>
        <span style={{ fontSize: "16px" }}>Mode Animateur</span>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          backgroundColor: "#dfccf7",
          width: "100%",
          maxWidth: "700px",
          padding: "36px",
          border: "4px solid #ffffff",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {currentQuestion ? (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#ffffff", marginBottom: "20px", fontSize: "16px" }}>
                <span>Question {currentIndex + 1} / {questions.length}</span>
                <span>{validatedRound ? "Statut : Réponses validées" : "Statut : En cours..."}</span>
              </div>

              <h2 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "24px", textAlign: "center" }}>
                {currentQuestion.text}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginBottom: "24px" }}>
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctAnswer;
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: validatedRound && isCorrect ? "#4caf50" : "rgba(255,255,255,0.3)",
                        color: "#ffffff",
                        border: "2px solid #ffffff",
                        borderRadius: "20px",
                        padding: "12px 20px",
                        fontSize: "18px",
                        fontFamily: "Georgia, serif",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span>{option}</span>
                      {validatedRound && isCorrect && (
                        <span style={{ fontWeight: "bold", fontSize: "14px", backgroundColor: "#ffffff", color: "#4caf50", padding: "2px 8px", borderRadius: "10px" }}>
                          Correcte
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleValidateAnswers}
                  disabled={validatedRound}
                  style={{
                    flex: 1,
                    backgroundColor: validatedRound ? "#cccccc" : "#ffb74d",
                    color: "#000000",
                    border: "2px solid #000000",
                    borderRadius: "20px",
                    padding: "12px",
                    fontSize: "16px",
                    fontFamily: "Georgia, serif",
                    cursor: validatedRound ? "not-allowed" : "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Valider les réponses
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentIndex + 1 >= questions.length}
                  style={{
                    flex: 1,
                    backgroundColor: currentIndex + 1 >= questions.length ? "#cccccc" : "#a5d6a7",
                    color: "#000000",
                    border: "2px solid #000000",
                    borderRadius: "20px",
                    padding: "12px",
                    fontSize: "16px",
                    fontFamily: "Georgia, serif",
                    cursor: currentIndex + 1 >= questions.length ? "not-allowed" : "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Question suivante
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#ffffff" }}>
              <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>Quiz terminé !</h2>
              <p style={{ fontSize: "20px" }}>Toutes les questions ont été posées.</p>
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

import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export function PlayerGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

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

  const handleSelectOption = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption !== null && questions[currentIndex] && !isAnswerSubmitted) {
      if (selectedOption === questions[currentIndex].correctAnswer) {
        setScore(score + 10);
      }
      setIsAnswerSubmitted(true);
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
        Chargement des questions...
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
        <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
          BUZZER - JOUEUR
        </span>
        <span style={{ fontSize: "16px" }}>Score : {score} pts</span>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          backgroundColor: "#f5f2eb",
          width: "100%",
          maxWidth: "600px",
          padding: "36px",
          border: "4px solid #ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {currentQuestion ? (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#333333", marginBottom: "20px", fontSize: "16px", fontWeight: "bold" }}>
                <span>Question {currentIndex + 1} / {questions.length}</span>
              </div>

              <h2 style={{ color: "#222222", fontSize: "24px", marginBottom: "24px", textAlign: "center" }}>
                {currentQuestion.text}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginBottom: "24px" }}>
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    style={{
                      backgroundColor: selectedOption === index ? "#1e5272" : "#ffffff",
                      color: selectedOption === index ? "#ffffff" : "#222222",
                      border: "2px solid #dcd6cd",
                      borderRadius: "20px",
                      padding: "12px 20px",
                      fontSize: "18px",
                      fontFamily: "Georgia, serif",
                      cursor: isAnswerSubmitted ? "not-allowed" : "pointer",
                      textAlign: "left",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null || isAnswerSubmitted}
                style={{
                  width: "100%",
                  backgroundColor: (selectedOption === null || isAnswerSubmitted) ? "#cccccc" : "#a5d6a7",
                  color: "#000000",
                  border: "2px solid #000000",
                  borderRadius: "20px",
                  padding: "12px",
                  fontSize: "18px",
                  fontFamily: "Georgia, serif",
                  cursor: (selectedOption === null || isAnswerSubmitted) ? "not-allowed" : "pointer",
                  fontWeight: "bold"
                }}
              >
                {isAnswerSubmitted ? "Réponse envoyée (En attente de l'animateur)" : "Valider ma réponse"}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#222222" }}>
              <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>Partie terminée !</h2>
              <p style={{ fontSize: "22px" }}>Votre score final est de : {score} points</p>
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

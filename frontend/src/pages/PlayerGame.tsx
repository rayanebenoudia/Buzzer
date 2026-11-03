import { useState, useEffect } from "react";

// Interface representing a quiz question structure
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Player Game screen component
export function PlayerGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Fetch questions from the backend API on component mount
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

  // Handle answer selection
  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (selectedOption !== null && questions[currentIndex]) {
      if (selectedOption === questions[currentIndex].correctAnswer) {
        setScore(score + 10);
      }
    }
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
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
        <span style={{ fontSize: "16px" }}>Score : {score} pts</span>
      </div>

      {/* Central Content */}
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
          maxWidth: "600px",
          padding: "36px",
          border: "4px solid #ffffff",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {!isFinished && currentQuestion ? (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#ffffff", marginBottom: "20px", fontSize: "16px" }}>
                <span>Question {currentIndex + 1} / {questions.length}</span>
              </div>

              <h2 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "24px", textAlign: "center" }}>
                {currentQuestion.text}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginBottom: "24px" }}>
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    style={{
                      backgroundColor: selectedOption === index ? "#1e5272" : "rgba(255,255,255,0.3)",
                      color: "#ffffff",
                      border: "2px solid #ffffff",
                      borderRadius: "20px",
                      padding: "12px 20px",
                      fontSize: "18px",
                      fontFamily: "Georgia, serif",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                style={{
                  width: "100%",
                  backgroundColor: selectedOption === null ? "#cccccc" : "#a5d6a7",
                  color: "#000000",
                  border: "2px solid #000000",
                  borderRadius: "20px",
                  padding: "10px",
                  fontSize: "18px",
                  fontFamily: "Georgia, serif",
                  cursor: selectedOption === null ? "not-allowed" : "pointer"
                }}
              >
                Valider / Suivant
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#ffffff" }}>
              <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>Partie terminée !</h2>
              <p style={{ fontSize: "22px" }}>Votre score final est de : {score} points</p>
            </div>
          )}
        </div>
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

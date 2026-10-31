import { useState, useEffect } from "react";
import { questions } from "../data/questions";

interface ScoreData {
  [playerName: string]: number;
}

export default function HostDashboard() {
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [scores, setScores] = useState<ScoreData>({});
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    localStorage.setItem("quiz_qindex", currentQ.toString());
    localStorage.setItem("quiz_showanswer", showAnswer ? "true" : "false");
    localStorage.setItem("quiz_finished", gameFinished ? "true" : "false");
  }, [currentQ, showAnswer, gameFinished]);

  useEffect(() => {
    let interval: any;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  useEffect(() => {
    const handleStorage = () => {
      const savedScores = localStorage.getItem("quiz_scores");
      if (savedScores) setScores(JSON.parse(savedScores));
    };
    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setShowAnswer(false);
      setTimer(15);
      setTimerActive(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setTimerActive(false);
  };

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setShowAnswer(false);
    setTimer(15);
    setTimerActive(false);
    setGameFinished(false);
    setScores({});
    localStorage.removeItem("quiz_scores");
  };

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-8">🏆 Podium Final 🏆</h1>
        
        {/* Podium Top 3 */}
        <div className="flex justify-center items-end gap-4 mb-10 w-full max-w-md h-48">
          {/* 2ème Place */}
          {sortedScores[1] && (
            <div className="flex flex-col items-center flex-1">
              <span className="font-bold text-lg text-gray-300">{sortedScores[1][0]}</span>
              <span className="text-sm text-gray-400 mb-1">{sortedScores[1][1]} pts</span>
              <div className="bg-gray-400 w-full h-32 rounded-t-lg flex items-center justify-center text-2xl font-bold text-gray-900">
                🥈
              </div>
            </div>
          )}

          {/* 1ère Place */}
          {sortedScores[0] && (
            <div className="flex flex-col items-center flex-1">
              <span className="font-bold text-xl text-yellow-400">{sortedScores[0][0]}</span>
              <span className="text-sm text-yellow-300 mb-1">{sortedScores[0][1]} pts</span>
              <div className="bg-yellow-500 w-full h-40 rounded-t-lg flex items-center justify-center text-3xl font-bold text-gray-900">
                🥇
              </div>
            </div>
          )}

          {/* 3ème Place */}
          {sortedScores[2] && (
            <div className="flex flex-col items-center flex-1">
              <span className="font-bold text-lg text-amber-600">{sortedScores[2][0]}</span>
              <span className="text-sm text-gray-400 mb-1">{sortedScores[2][1]} pts</span>
              <div className="bg-amber-700 w-full h-24 rounded-t-lg flex items-center justify-center text-2xl font-bold text-gray-900">
                🥉
              </div>
            </div>
          )}
        </div>

        {/* Reste du classement */}
        {sortedScores.length > 3 && (
          <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-bold mb-2 border-b border-gray-700 pb-2">Classement</h3>
            {sortedScores.slice(3).map(([name, score], idx) => (
              <div key={name} className="flex justify-between py-1 border-b border-gray-700/50">
                <span>{idx + 4}. {name}</span>
                <span className="font-bold">{score} pts</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleRestart}
          className="bg-teal-500 hover:bg-teal-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition"
        >
          Nouvelle Partie 🔄
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-teal-400">
            Question {currentQ + 1} / {questions.length}
          </span>
          <span className={`text-2xl font-bold ${timer <= 5 ? "text-red-500 animate-pulse" : "text-teal-400"}`}>
            ⏱️ {timer}s
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-6">{q.question}</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctAnswer;
            return (
              <div
                key={i}
                className={`p-4 rounded-lg font-semibold text-center border-2 ${
                  showAnswer
                    ? isCorrect
                      ? "bg-green-600 border-green-400 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-500"
                    : "bg-gray-800 border-gray-700"
                }`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStartTimer}
          disabled={timerActive || timer === 0}
          className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg text-lg"
        >
          Lancer le timer ⏱️
        </button>
        <button
          onClick={handleReveal}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg text-lg"
        >
          Révéler Réponse 👁️
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-bold py-3 rounded-lg text-lg"
        >
          {currentQ < questions.length - 1 ? "Question Suivante ➡️" : "Voir le Podium 🏆"}
        </button>
      </div>
    </div>
  );
}

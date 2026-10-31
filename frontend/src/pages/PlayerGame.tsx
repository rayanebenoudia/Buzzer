import { useState, useEffect } from "react";
import { questions } from "../data/questions";

interface ScoreData {
  [playerName: string]: number;
}

export default function PlayerGame() {
  const [playerName, setPlayerName] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scores, setScores] = useState<ScoreData>({});
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("quiz_player_name") || "Joueur Anonyme";
    setPlayerName(savedName);

    const syncState = () => {
      const qIdx = localStorage.getItem("quiz_qindex");
      const answerShown = localStorage.getItem("quiz_showanswer");
      const finished = localStorage.getItem("quiz_finished");
      const savedScores = localStorage.getItem("quiz_scores");

      if (qIdx !== null && parseInt(qIdx) !== currentQ) {
        setCurrentQ(parseInt(qIdx));
        setSelectedOption(null);
      }
      setShowAnswer(answerShown === "true");
      setGameFinished(finished === "true");
      if (savedScores) setScores(JSON.parse(savedScores));
    };

    syncState();
    window.addEventListener("storage", syncState);
    const interval = setInterval(syncState, 500);

    return () => {
      window.removeEventListener("storage", syncState);
      clearInterval(interval);
    };
  }, [currentQ]);

  const handleSelect = (index: number) => {
    if (selectedOption !== null || showAnswer || gameFinished) return;
    setSelectedOption(index);

    const isCorrect = index === questions[currentQ].correctAnswer;
    const currentScores = JSON.parse(localStorage.getItem("quiz_scores") || "{}");
    const oldScore = currentScores[playerName] || 0;
    const newScore = isCorrect ? oldScore + 100 : oldScore;

    const updated = { ...currentScores, [playerName]: newScore };
    localStorage.setItem("quiz_scores", JSON.stringify(updated));
    setScores(updated);
  };

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const myRank = sortedScores.findIndex(([name]) => name === playerName) + 1;
  const myScore = scores[playerName] || 0;

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-teal-400 mb-4">Fin de la Partie ! 🏆</h1>
        <p className="text-xl mb-2">Bravo <span className="text-teal-300 font-bold">{playerName}</span> !</p>
        <div className="bg-gray-800 p-6 rounded-xl border-2 border-teal-500 text-center mb-6 w-full max-w-xs">
          <p className="text-gray-400 mb-1">Ton score final</p>
          <p className="text-4xl font-extrabold text-teal-400 mb-4">{myScore} pts</p>
          {myRank > 0 && (
            <p className="text-lg">
              Position : <span className="font-bold text-yellow-400">#{myRank}</span> / {sortedScores.length}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500">En attente de l'hôte pour relancer une partie...</p>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">Joueur : <strong className="text-teal-400">{playerName}</strong></span>
          <span className="text-sm font-bold text-teal-400">Score : {myScore} pts</span>
        </div>

        <h2 className="text-xl font-bold mb-6">{q.question}</h2>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === q.correctAnswer;

            let btnStyle = "bg-gray-800 border-gray-700 hover:bg-gray-700";
            if (showAnswer) {
              if (isCorrect) btnStyle = "bg-green-600 border-green-400 text-white";
              else if (isSelected) btnStyle = "bg-red-600 border-red-400 text-white";
              else btnStyle = "bg-gray-800 border-gray-700 opacity-50";
            } else if (isSelected) {
              btnStyle = "bg-teal-600 border-teal-400 text-white";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selectedOption !== null || showAnswer}
                className={`p-4 rounded-xl border-2 font-semibold text-left transition ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        {selectedOption !== null && !showAnswer && "Choix enregistré ! En attente de la réponse..."}
      </div>
    </div>
  );
}

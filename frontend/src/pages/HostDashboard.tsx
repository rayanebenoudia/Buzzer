import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';

interface HostDashboardProps {
  onBack: () => void;
}

export const HostDashboard: React.FC<HostDashboardProps> = ({ onBack }) => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players] = useState<string[]>(['Ines', 'Rayane', 'Amel']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleCreateRoom = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomCode(code);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: 'serif', margin: 0, justifyContent: 'space-between' }}>
      <header style={{ background: '#000', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px' }}>BUZZER - Animateur</span>
        <button onClick={onBack} style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'serif', fontSize: '14px' }}>
          Accueil
        </button>
      </header>

      <main style={{ textAlign: 'center', padding: '30px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '32px', fontStyle: 'italic', marginBottom: '20px', color: '#f3f4f6' }}>Tableau de bord Animateur</h1>

        {!roomCode ? (
          <div style={{ marginTop: '40px' }}>
            <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '30px' }}>Creez votre salon pour lancer le quiz avec la serie de questions.</p>
            <button onClick={handleCreateRoom} style={{ background: '#10b981', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}>
              Creer une partie
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1f2937', padding: '15px 25px', borderRadius: '12px', border: '1px solid #374151' }}>
              <div>
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>Code du salon : </span>
                <strong style={{ fontSize: '24px', color: '#34d399', letterSpacing: '3px' }}>{roomCode}</strong>
              </div>
              <div>
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>Joueurs : </span>
                <strong style={{ color: '#f3f4f6' }}>{players.join(', ')}</strong>
              </div>
            </div>

            <div style={{ background: '#1f2937', padding: '25px', borderRadius: '16px', border: '2px solid #374151', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 'bold' }}>{currentQ.category}</span>
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
              </div>

              <h2 style={{ fontSize: '22px', color: '#fff', marginBottom: '20px', lineHeight: '1.4' }}>{currentQ.question}</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {currentQ.options.map((opt, idx) => {
                  const isCorrect = idx === currentQ.correctAnswerIndex;
                  return (
                    <div key={idx} style={{ padding: '12px 16px', borderRadius: '8px', background: showAnswer && isCorrect ? '#065f46' : '#374151', border: showAnswer && isCorrect ? '2px solid #10b981' : '1px solid #4b5563', color: '#fff', fontSize: '16px' }}>
                      <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <button onClick={() => setShowAnswer(!showAnswer)} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'serif' }}>
                  {showAnswer ? 'Masquer la reponse' : 'Reveler la reponse'}
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} style={{ background: currentQuestionIndex === 0 ? '#4b5563' : '#374151', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer', fontFamily: 'serif' }}>
                    Precedent
                  </button>
                  <button onClick={handleNextQuestion} disabled={currentQuestionIndex === QUIZ_QUESTIONS.length - 1} style={{ background: currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? '#4b5563' : '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'not-allowed' : 'pointer', fontFamily: 'serif' }}>
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '12px', fontSize: '13px', fontStyle: 'italic' }}>
        Creer par l'equipe buzzer - 2026
      </footer>
    </div>
  );
};
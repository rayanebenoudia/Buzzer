import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';

interface PlayerGameProps {
  onBack: () => void;
}

export const PlayerGame: React.FC<PlayerGameProps> = ({ onBack }) => {
  const [joined, setJoined] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('');
  const [currentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && roomCode.trim()) {
      setJoined(true);
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#93c5fd', fontFamily: 'serif', margin: 0, justifyContent: 'space-between' }}>
      <header style={{ background: '#000', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px' }}>BUZZER - Joueur</span>
        <button onClick={onBack} style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'serif', fontSize: '14px' }}>
          Accueil
        </button>
      </header>

      <main style={{ textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        {!joined ? (
          <div>
            <h1 style={{ fontSize: '36px', fontStyle: 'italic', color: '#fff', marginBottom: '25px', letterSpacing: '2px' }}>Rejoindre une partie</h1>
            <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255, 255, 255, 0.2)', padding: '30px', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
              <input type='text' placeholder='Ton pseudo' value={playerName} onChange={(e) => setPlayerName(e.target.value)} required style={{ padding: '12px 20px', borderRadius: '25px', border: 'none', fontSize: '16px', fontFamily: 'serif', outline: 'none' }} />
              <input type='text' placeholder='Code PIN du salon' value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} maxLength={4} required style={{ padding: '12px 20px', borderRadius: '25px', border: 'none', fontSize: '16px', fontFamily: 'serif', outline: 'none', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center' }} />
              <button type='submit' style={{ background: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontSize: '16px', cursor: 'pointer', fontFamily: 'serif', marginTop: '10px' }}>
                Rejoindre
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '24px', fontStyle: 'italic', color: '#fff', margin: 0 }}>Joueur : {playerName}</h2>
              <span style={{ color: '#1e3a8a', fontSize: '14px' }}>Salon : <strong>{roomCode}</strong></span>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'left' }}>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>{currentQ.category}</span>
              <h3 style={{ fontSize: '18px', color: '#1e293b', marginTop: '5px', marginBottom: '15px' }}>{currentQ.question}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button key={idx} onClick={() => setSelectedOption(idx)} style={{ padding: '12px 16px', borderRadius: '12px', border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1', background: isSelected ? '#dbeafe' : '#f8fafc', color: '#1e293b', textAlign: 'left', fontSize: '15px', cursor: 'pointer', fontFamily: 'serif' }}>
                      <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                    </button>
                  );
                })}
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
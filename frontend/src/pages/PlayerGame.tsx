import React, { useState } from 'react';

interface PlayerGameProps {
  onBack: () => void;
}

export const PlayerGame: React.FC<PlayerGameProps> = ({ onBack }) => {
  const [joined, setJoined] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('');
  const [buzzed, setBuzzed] = useState<boolean>(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && roomCode.trim()) {
      setJoined(true);
    }
  };

  const handleBuzz = () => {
    setBuzzed(true);
    // Réinitialisation automatique du buzzer après 3 secondes (simulation)
    setTimeout(() => setBuzzed(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#93c5fd', fontFamily: 'serif', margin: 0, justifyContent: 'space-between' }}>
      {/* Barre du haut */}
      <header style={{ background: '#000', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px' }}>BUZZER - Joueur</span>
        <button 
          onClick={onBack}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'serif', fontSize: '14px' }}
        >
          Accueil
        </button>
      </header>

      {/* Corps principal */}
      <main style={{ textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        {!joined ? (
          <div>
            <h1 style={{ fontSize: '36px', fontStyle: 'italic', color: '#fff', marginBottom: '25px', letterSpacing: '2px' }}>Rejoindre une partie</h1>
            <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255, 255, 255, 0.2)', padding: '30px', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
              <input 
                type='text'
                placeholder='Ton pseudo'
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                style={{ padding: '12px 20px', borderRadius: '25px', border: 'none', fontSize: '16px', fontFamily: 'serif', outline: 'none' }}
              />
              <input 
                type='text'
                placeholder='Code PIN du salon'
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={4}
                required
                style={{ padding: '12px 20px', borderRadius: '25px', border: 'none', fontSize: '16px', fontFamily: 'serif', outline: 'none', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center' }}
              />
              <button 
                type='submit'
                style={{ background: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontSize: '16px', cursor: 'pointer', fontFamily: 'serif', marginTop: '10px' }}
              >
                Rejoindre
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '28px', fontStyle: 'italic', color: '#fff', marginBottom: '10px' }}>Joueur : {playerName}</h2>
            <p style={{ color: '#1e3a8a', fontSize: '16px', marginBottom: '30px' }}>Salon : <strong>{roomCode}</strong></p>

            {/* Zone du Buzzer */}
            <div 
              onClick={!buzzed ? handleBuzz : undefined}
              style={{ 
                margin: '0 auto', 
                width: '220px', 
                height: '220px', 
                cursor: buzzed ? 'not-allowed' : 'pointer',
                transform: buzzed ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.1s ease'
              }}
            >
              <svg viewBox='0 0 200 160' width='100%' height='100%'>
                <rect x='45' y='20' width='8' height='20' rx='4' fill={buzzed ? '#fef08a' : '#e0f2fe'} transform='rotate(-30 49 30)' />
                <rect x='96' y='10' width='8' height='20' rx='4' fill={buzzed ? '#fef08a' : '#e0f2fe'} />
                <rect x='147' y='20' width='8' height='20' rx='4' fill={buzzed ? '#fef08a' : '#e0f2fe'} transform='rotate(30 151 30)' />
                
                <ellipse cx='100' cy='125' rx='75' ry='25' fill='#1e3a4c' />
                <ellipse cx='100' cy='120' rx='75' ry='25' fill='#244d63' />
                
                <path d='M 25 100 L 25 120 A 75 25 0 0 0 175 120 L 175 100 Z' fill={buzzed ? '#991b1b' : '#1b4959'} />
                
                <ellipse cx='100' cy='95' rx='65' ry='22' fill={buzzed ? '#ef4444' : '#14b8a6'} />
                <path d='M 35 75 L 35 95 A 65 22 0 0 0 165 95 L 165 75 Z' fill={buzzed ? '#dc2626' : '#0d9488'} />
                <ellipse cx='100' cy='75' rx='65' ry='22' fill={buzzed ? '#f87171' : '#2dd4bf'} />
                
                <ellipse cx='80' cy='70' rx='35' ry='10' fill='#ffffff' opacity='0.6' />
              </svg>
            </div>

            <p style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold', color: buzzed ? '#dc2626' : '#fff' }}>
              {buzzed ? 'BUZZÉ ! 🚨' : 'Clique pour buzzer !'}
            </p>
          </div>
        )}
      </main>

      {/* Barre du bas */}
      <footer style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '12px', fontSize: '13px', fontStyle: 'italic' }}>
        Créer par l'équipe buzzer - 2026
      </footer>
    </div>
  );
};
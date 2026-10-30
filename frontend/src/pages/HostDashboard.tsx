import React, { useState } from 'react';

export const HostDashboard: React.FC = () => {
  const [gameCreated, setGameCreated] = useState(false);
  const [gameCode, setGameCode] = useState('');

  const handleCreateGame = () => {
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    setGameCode(randomCode);
    setGameCreated(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'sans-serif' }}>
      <h2>ESPACE ANIMATEUR - LE BUZZER</h2>
      {!gameCreated ? (
        <div style={{ marginTop: '30px' }}>
          <button onClick={handleCreateGame} style={{ padding: '15px 30px', fontSize: '18px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Créer une partie</button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>Code d'accès :</h3>
          <h1 style={{ fontSize: '48px', color: '#1e3a8a' }}>{gameCode}</h1>
        </div>
      )}
    </div>
  );
};
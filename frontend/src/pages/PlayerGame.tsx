import React, { useState } from 'react';

export const PlayerGame: React.FC = () => {
  const [username, setUsername] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && gameCode) {
      setJoined(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'sans-serif' }}>
      <h2>ESPACE JOUEUR - LE BUZZER</h2>
      {!joined ? (
        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Pseudonyme :</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: '8px', fontSize: '16px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Code à 5 lettres :</label>
            <input type='text' value={gameCode} onChange={(e) => setGameCode(e.target.value.toUpperCase())} maxLength={5} required style={{ padding: '8px', fontSize: '16px', textTransform: 'uppercase' }} />
          </div>
          <button type='submit' style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Rejoindre</button>
        </form>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h3>En attente de la prochaine question...</h3>
          <p>Bienvenue <strong>{username}</strong> dans la partie <strong>{gameCode}</strong></p>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';

interface HostDashboardProps {
  onBack: () => void;
}

export const HostDashboard: React.FC<HostDashboardProps> = ({ onBack }) => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  const handleCreateRoom = () => {
    // Génération d'un code de salon de 4 caractères (lettres majuscules + chiffres)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomCode(code);
    setPlayers(['Inès', 'Rayane', 'Amel']);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: 'serif', margin: 0, justifyContent: 'space-between' }}>
      {/* Barre du haut */}
      <header style={{ background: '#000', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px' }}>BUZZER - Animateur</span>
        <button 
          onClick={onBack}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'serif', fontSize: '14px' }}
        >
          Accueil
        </button>
      </header>

      {/* Corps principal */}
      <main style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '36px', fontStyle: 'italic', marginBottom: '20px', color: '#f3f4f6' }}>Tableau de bord Animateur</h1>

        {!roomCode ? (
          <div style={{ marginTop: '40px' }}>
            <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '30px' }}>Créez votre salon pour inviter les joueurs à vous rejoindre.</p>
            <button 
              onClick={handleCreateRoom}
              style={{ background: '#10b981', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}
            >
              Créer une partie
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <div style={{ background: '#1f2937', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '2px solid #374151' }}>
              <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '5px' }}>Code du salon :</p>
              <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#34d399', letterSpacing: '6px', margin: 0 }}>{roomCode}</h2>
            </div>

            <div style={{ background: '#1f2937', padding: '20px', borderRadius: '16px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e5e7eb', borderBottom: '1px solid #374151', paddingBottom: '10px' }}>
                Joueurs connectés ({players.length})
              </h3>
              {players.length === 0 ? (
                <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>En attente de joueurs...</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {players.map((player, index) => (
                    <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #374151', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      🟢 {player}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
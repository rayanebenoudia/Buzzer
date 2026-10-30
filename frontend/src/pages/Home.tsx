import React from 'react';

interface HomeProps {
  onSelectRole: (role: 'player' | 'host') => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectRole }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#93c5fd', fontFamily: 'serif', margin: 0, justifyContent: 'space-between' }}>
      {/* Barre noire du haut */}
      <header style={{ background: '#000', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontStyle: 'italic', fontSize: '18px', letterSpacing: '1px' }}>BUZZER</span>
        <button 
          onClick={() => onSelectRole('host')}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'serif', fontSize: '14px' }}
        >
          Animateur
        </button>
      </header>

      {/* Corps de la page */}
      <main style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '42px', fontStyle: 'italic', color: '#fff', marginBottom: '20px', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>BUZZER</h1>
        
        {/* Illustration SVG exacte du logo buzzer */}
        <div style={{ margin: '0 auto 25px auto', width: '200px', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox='0 0 200 160' width='100%' height='100%'>
            {/* Lueurs / rayons */}
            <rect x='45' y='20' width='8' height='20' rx='4' fill='#e0f2fe' transform='rotate(-30 49 30)' />
            <rect x='96' y='10' width='8' height='20' rx='4' fill='#e0f2fe' />
            <rect x='147' y='20' width='8' height='20' rx='4' fill='#e0f2fe' transform='rotate(30 151 30)' />
            
            {/* Base sombre du buzzer */}
            <ellipse cx='100' cy='125' rx='75' ry='25' fill='#1e3a4c' />
            <ellipse cx='100' cy='120' rx='75' ry='25' fill='#244d63' />
            
            {/* Corps cylindrique du bouton */}
            <path d='M 25 100 L 25 120 A 75 25 0 0 0 175 120 L 175 100 Z' fill='#1b4959' />
            
            {/* Bouton turquoise en relief */}
            <ellipse cx='100' cy='95' rx='65' ry='22' fill='#14b8a6' />
            <path d='M 35 75 L 35 95 A 65 22 0 0 0 165 95 L 165 75 Z' fill='#0d9488' />
            <ellipse cx='100' cy='75' rx='65' ry='22' fill='#2dd4bf' />
            
            {/* Reflet lumineux sur le bouton */}
            <ellipse cx='80' cy='70' rx='35' ry='10' fill='#5eead4' opacity='0.6' />
          </svg>
        </div>

        <button 
          onClick={() => onSelectRole('player')}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 35px', borderRadius: '20px', fontSize: '16px', cursor: 'pointer', fontFamily: 'serif', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          Jouer
        </button>
      </main>

      {/* Barre noire du bas */}
      <footer style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '12px', fontSize: '13px', fontStyle: 'italic' }}>
        Créer par l'équipe buzzer - 2026
      </footer>
    </div>
  );
};
import { useState } from 'react';
import { Home } from './pages/Home';
import { PlayerGame } from './pages/PlayerGame';
import { HostDashboard } from './pages/HostDashboard';

export function App() {
  const [role, setRole] = useState<'home' | 'player' | 'host'>('home');

  return (
    <div>
      {role === 'home' && <Home onSelectRole={(selectedRole) => setRole(selectedRole)} />}
      {role === 'player' && <PlayerGame />}
      {role === 'host' && <HostDashboard />}

      {role !== 'home' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={() => setRole('home')}
            style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ← Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
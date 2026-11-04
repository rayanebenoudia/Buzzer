import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PlayerLogin } from "./pages/PlayerLogin";
import { PlayerGame } from "./pages/PlayerGame";
import { HostLobby } from "./pages/HostLobby";
import { HostDashboard } from "./pages/HostDashboard";
import { HostGame } from "./pages/HostGame";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player-login" element={<PlayerLogin />} />
        <Route path="/player-game" element={<PlayerGame />} />
        <Route path="/host-lobby" element={<HostLobby />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/host-login" element={<HostGame onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PlayerGame } from "./pages/PlayerGame";
import { HostGame } from "./pages/HostGame";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player-login" element={<PlayerGame />} />
        <Route path="/host-login" element={<HostGame onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;

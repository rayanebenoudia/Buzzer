import { useState } from "react";
import { Home } from "./pages/Home";
import { PlayerLogin } from "./pages/PlayerLogin";
import { PlayerGame } from "./pages/PlayerGame";
import { HostGame } from "./pages/HostGame";

export function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "player-login" | "player-game" | "host-game">("home");
  const [playerInfo, setPlayerInfo] = useState<{ nickname: string; code: string } | null>(null);

  const handlePlayerJoin = (nickname: string, code: string) => {
    setPlayerInfo({ nickname, code });
    setCurrentPage("player-game");
  };

  return (
    <div>
      {currentPage === "home" && (
        <Home onNavigate={(page) => setCurrentPage(page)} />
      )}

      {currentPage === "player-login" && (
        <PlayerLogin onJoin={handlePlayerJoin} onBack={() => setCurrentPage("home")} />
      )}

      {currentPage === "player-game" && (
        <PlayerGame />
      )}

      {currentPage === "host-game" && (
        <HostGame onBack={() => setCurrentPage("home")} />
      )}
    </div>
  );
}

export default App;

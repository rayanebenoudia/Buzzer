// Types pour les joueurs
export interface Player {
  id: string;
  username: string;
  score: number;
}

// Types pour les questions
export interface Question {
  id: number;
  text: string;
  choices: string[];
  duration: number; // en secondes
}

// État global de la partie
export interface GameState {
  gameCode: string;
  status: 'WAITING' | 'RUNNING' | 'FINISHED';
  currentQuestion?: Question;
  players: Player[];
}

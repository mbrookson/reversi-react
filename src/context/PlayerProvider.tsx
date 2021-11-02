import React, { createContext, useContext, useState } from 'react';
import { PlayerState, Player } from '../game/player';

const PlayerContext = createContext<PlayerState>({
  currentPlayer: Player.White,
  otherPlayer: Player.Black,
  toggleCurrentPlayer: () => {},
  setWinner: () => {},
});

export const usePlayer = () => useContext<PlayerState>(PlayerContext);

export const PlayerProvider: React.FC = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.White);
  const [winner, setWinner] = useState<Player | undefined>(undefined);
  const otherPlayer =
    currentPlayer === Player.Black ? Player.White : Player.Black;

  const playerState: PlayerState = {
    currentPlayer,
    otherPlayer,
    toggleCurrentPlayer: () => setCurrentPlayer(otherPlayer),
    winner,
    setWinner,
  };

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

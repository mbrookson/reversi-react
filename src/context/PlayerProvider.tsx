import React, { createContext, useContext, useState } from 'react';
import { PlayerState, Player } from '../game/player';

const PlayerContext = createContext<PlayerState>({
  currentPlayer: Player.White,
  toggleCurrentPlayer: () => {},
  setWinner: () => {}
});

export const usePlayer = () => useContext<PlayerState>(PlayerContext);

export const PlayerProvider: React.FC = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.White);
  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const playerState: PlayerState = {
    currentPlayer,
    toggleCurrentPlayer: () =>
      setCurrentPlayer(
        currentPlayer === Player.Black ? Player.White : Player.Black
      ),
    winner,
    setWinner
  };

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

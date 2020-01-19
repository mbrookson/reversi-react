import React from 'react';
import { Player } from '../../game/player';
import { usePlayer } from '../../context/PlayerProvider';

export const CurrentPlayer: React.FC = () => {
  const { currentPlayer } = usePlayer();

  return (
    <h3 style={{ color: 'white' }}>
      {currentPlayer === Player.Black ? 'Black' : 'White'} turn
    </h3>
  );
};
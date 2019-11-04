import React from 'react';
import { Player } from '../../game/player';
import { usePlayerStore } from '../StoreProvider';

export const CurrentPlayer: React.FC = () => {
  const { state } = usePlayerStore();
  return (
    <h3 style={{ color: 'white' }}>
      {state.currentPlayer === Player.Black ? 'Black' : 'White'} turn
    </h3>
  );
};

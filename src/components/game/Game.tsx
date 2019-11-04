import React from 'react';
import { CurrentPlayer } from '../currentPlayer/CurrentPlayer';
import { Board } from '../board/Board';

export const Game: React.FC = () => {
  return (
    <>
      <CurrentPlayer />
      <Board />
    </>
  );
};

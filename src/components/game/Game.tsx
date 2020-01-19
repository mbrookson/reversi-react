import React from 'react';
import { CurrentPlayer } from '../currentPlayer/CurrentPlayer';
import { Message } from '../messages/Message';
import { Board } from '../board/Board';

export const Game: React.FC = () => {
  return (
    <>
      <CurrentPlayer />
      <Message></Message>
      <Board />
    </>
  );
};

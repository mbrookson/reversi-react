import React, { useState, useEffect } from 'react';
import { CurrentPlayer } from '../currentPlayer/CurrentPlayer';
import { Message } from '../messages/Message';
import { Board } from '../board/Board';
import { usePlayer } from '../../context/PlayerProvider';
import Winner from '../winner/Winner';

enum Mode {
  StartMenu,
  GameEndMenu,
  Game
}

export const Game: React.FC = () => {
  const { winner, setWinner } = usePlayer();
  const [mode, setMode] = useState<Mode>(Mode.StartMenu);

  const play = () => {
    setWinner(undefined);
    setMode(Mode.Game);
  };

  useEffect(() => {
    if (winner) {
      setMode(Mode.GameEndMenu);
    }
  }, [winner, setMode, setWinner]);

  return (
    <>
      {mode === Mode.StartMenu ? (
        <div>
          <button
            className="py-5 px-10 bg-green-500 rounded-lg text-3xl"
            onClick={play}
          >
            Play
          </button>
        </div>
      ) : mode === Mode.GameEndMenu ? (
        <Winner winner={winner} onPlayAgain={() => play()} />
      ) : (
        <>
          <CurrentPlayer />
          <Message></Message>
          <Board />
        </>
      )}
    </>
  );
};

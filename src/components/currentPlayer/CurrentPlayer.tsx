import React, { useEffect } from 'react';
import { Player } from '../../game/player';
import { usePlayer } from '../../context/PlayerProvider';
import useTimer from '../../hooks/timer';

export const CurrentPlayer: React.FC = () => {
  const { currentPlayer, setWinner } = usePlayer();
  const blackTimer = useTimer(5);
  const whiteTimer = useTimer(5);

  useEffect(() => {
    if (currentPlayer === Player.Black) {
      whiteTimer.pause();
      blackTimer.start();
    } else {
      blackTimer.pause();
      whiteTimer.start();
    }
  }, [blackTimer, whiteTimer, currentPlayer]);

  useEffect(() => {
    if (blackTimer.expired) {
      setWinner(Player.White);
    } else if (whiteTimer.expired) {
      setWinner(Player.Black);
    }
  }, [blackTimer.expired, whiteTimer.expired, setWinner]);

  return (
    <>
      <h3 className="font-bold text-2xl mb-2">
        {currentPlayer === Player.Black ? 'Black' : 'White'} turn
      </h3>
      <p className="text-xl mb-2">
        Time remaining:{' '}
        {currentPlayer === Player.Black
          ? blackTimer.timeRemaining
          : whiteTimer.timeRemaining}
      </p>
    </>
  );
};

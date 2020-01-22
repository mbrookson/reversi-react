import React, { useEffect } from 'react';
import { Player } from '../../game/player';
import { usePlayer } from '../../context/PlayerProvider';
import useTimer from '../../hooks/timer';

export const CurrentPlayer: React.FC = () => {
  const { currentPlayer } = usePlayer();
  const blackTimer = useTimer(3);
  const whiteTimer = useTimer(3);

  useEffect(() => {
    if (currentPlayer === Player.Black) {
      whiteTimer.pause();
      blackTimer.start();
    } else {
      blackTimer.pause();
      whiteTimer.start();
    }
  }, [blackTimer, whiteTimer, currentPlayer]);

  return (
    <>
      <h3 className="font-bold text-xl">
        {currentPlayer === Player.Black ? 'Black' : 'White'} turn
      </h3>
      <p>
        Time remaining:{' '}
        {currentPlayer === Player.Black
          ? blackTimer.timeRemaining
          : whiteTimer.timeRemaining}
      </p>
    </>
  );
};

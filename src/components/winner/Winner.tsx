import React from 'react';
import { Player } from '../../game/player';

type Props = {
  winner?: Player;
  onPlayAgain: () => void;
};

const Winner: React.FC<Props> = ({ winner, onPlayAgain }) => {
  return (
    <div>
      <h3 className="text-3xl mb-5">
        Winner is <b>{winner === Player.Black ? 'black' : 'white'}</b>!
      </h3>
      <h4 className="text-5xl mb-8">
        <span role="img" aria-label="Tada!">
          🎉
        </span>
      </h4>
      <button
        className="py-5 px-10 bg-green-500 rounded-lg text-3xl"
        onClick={onPlayAgain}
      >
        Play again
      </button>
    </div>
  );
};

export default Winner;

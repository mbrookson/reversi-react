import React from 'react';
import { Player } from '../../game/player';

export interface TileModel {
  x: number;
  y: number;
  player?: Player;
}

interface Props extends TileModel {
  onClick: (tile: TileModel) => void;
}

export const Tile: React.FC<Props> = (props: Props) => {
  const { x, y, player, onClick } = props;
  let counterStyle = '';

  switch (player) {
    case Player.Black:
      counterStyle = 'block bg-black';
      break;
    case Player.White:
      counterStyle = 'block bg-white';
      break;
    default:
      counterStyle = 'hidden';
  }

  return (
    <div
      key={x + ',' + y}
      className={`x-${x} y-${y} flex items-center justify-center bg-green-700 hover:bg-green-800 cursor-pointer`}
      onClick={() => onClick(props)}
    >
      <div
        style={{ width: '90%', height: '90%' }}
        className={`rounded-full shadow-lg block ${counterStyle}`}
      ></div>
    </div>
  );
};

import React from 'react';
import styles from '../board/Board.module.scss';
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
      counterStyle = styles.black;
      break;
    case Player.White:
      counterStyle = styles.white;
      break;
  }

  return (
    <div
      key={x + ',' + y}
      className={styles.tile}
      onClick={() => onClick(props)}
    >
      <div className={[styles.counter, counterStyle].join(' ')}></div>
    </div>
  );
};

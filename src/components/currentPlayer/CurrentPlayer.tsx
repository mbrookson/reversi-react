import React from 'react';
import { Player } from '../../game/player';

interface Props {
  player: Player;
}

export const CurrentPlayer: React.FC<Props> = (props) => {
  return (
    <h3 style={{color: 'white'}}>
      {props.player === Player.Black ? 'Black' : 'White'} turn
    </h3>
  )
};

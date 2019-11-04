import { Action } from '../models/action';
import { Player } from '../game/player';
import { SWITCH_PLAYER } from '../actions/currentPlayer';
import { PlayerState } from '../models/store';

export const playerReducer = <T>(
  state: PlayerState,
  action: Action<T>
): PlayerState => {
  switch (action.type) {
    case SWITCH_PLAYER:
      return {
        ...state,
        currentPlayer:
          state.currentPlayer === Player.Black ? Player.White : Player.Black
      };
  }

  return state;
};

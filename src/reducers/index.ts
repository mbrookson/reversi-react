import { GameState } from '../models/store';
import { Action } from '../models/action';
import { playerReducer } from './player';
import { Player } from '../game/player';

export const initialState: GameState = {
  player: {
    currentPlayer: Player.Black
  }
};

const rootReducer = (state: GameState, action: Action<any>) => {
  return {
    player: playerReducer(state.player, action)
  };
};

export default rootReducer;

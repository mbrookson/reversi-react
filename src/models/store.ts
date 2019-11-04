import { Player } from '../game/player';

export interface GameState {
  player: PlayerState;
}

export interface PlayerState {
  currentPlayer: Player;
}

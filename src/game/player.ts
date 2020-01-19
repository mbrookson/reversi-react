export enum Player {
  Black,
  White
}

export interface PlayerState {
  currentPlayer: Player;
  toggleCurrentPlayer: () => void;
}

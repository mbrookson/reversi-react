export enum Player {
  Black = 1,
  White = 2
}

export interface PlayerState {
  currentPlayer: Player;
  toggleCurrentPlayer: () => void;
}

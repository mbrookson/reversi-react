import { TileModel } from "../components/tile/Tile";
import { Player } from "./player";

export const generateTiles = () => {
  const width = 8;
  const tiles: TileModel[][] = [];

  for (let x = 0; x <= width - 1; x++) {
    tiles[x] = [];
    for (let y = 0; y <= width - 1; y++) {
      tiles[x][y] = { x, y };
    }
  }

  return tiles;
}

export const defaultTiles: TileModel[] = [
  { x: 3, y: 3, player: Player.Black },
  { x: 4, y: 4, player: Player.Black },
  { x: 3, y: 4, player: Player.White },
  { x: 4, y: 3, player: Player.White },
];
import { TileModel } from '../components/tile/Tile';
import { boardWidth } from './config';
import { Player } from './player';

const maxIndex = boardWidth - 1;

export const generateTiles = () => {
  const tiles: TileModel[][] = [];

  for (let y = 0; y <= maxIndex; y++) {
    tiles[y] = [];
    for (let x = 0; x <= maxIndex; x++) {
      tiles[y][x] = { x, y };

      const defaultTile = defaultTiles.find((t) => t.x === x && t.y === y);

      if (defaultTile) {
        tiles[y][x].player = defaultTile.player;
      }
    }
  }

  return tiles;
};

export const defaultTiles: TileModel[] = [
  { x: 3, y: 3, player: Player.Black },
  { x: 4, y: 4, player: Player.Black },
  { x: 3, y: 4, player: Player.White },
  { x: 4, y: 3, player: Player.White },
];

export const immutableMapTiles = (
  tiles: TileModel[][],
  callback: (tile: TileModel) => TileModel
): TileModel[][] => {
  return [
    ...tiles.map((row) => [
      ...row.map((t) => {
        return callback({ ...t });
      }),
    ]),
  ];
};

export const analyseTilesToBeFlipped = (
  currentPlayer: Player,
  selectedTile: TileModel,
  tiles: TileModel[][]
): TileModel[] => {
  let { x, y } = selectedTile;
  let tilesToFlip: TileModel[] = [tiles[y][x]];

  const resetXY = () => {
    x = selectedTile.x;
    y = selectedTile.y;
  };

  const up = () => {
    y--;
  };
  const down = () => {
    y++;
  };
  const left = () => {
    x--;
  };
  const right = () => {
    x++;
  };
  const upLeft = () => {
    x--;
    y--;
  };
  const upRight = () => {
    x++;
    y--;
  };
  const downLeft = () => {
    x--;
    y++;
    console.log('checked down left');
  };
  const downRight = () => {
    x++;
    y++;
  };

  const check = (condition: () => boolean, move: () => void) => {
    let cache: TileModel[] = [];
    while (condition()) {
      // y=3, x=0
      // y=2, x=1
      let tile = tiles[y][x];
      if (
        !tile.player &&
        (tile.x !== selectedTile.x || tile.y !== selectedTile.y)
      ) {
        // Stop when we reach an empty tile or it's the selected tile.
        break;
      } else if (tile.player && tile.player !== currentPlayer) {
        // If the other player has a tile here it can be flipped.
        cache.push(tile);
      } else if (tile.player && tile.player === currentPlayer) {
        // Stop when we reach our own tile as we've determined all tiles to flip.
        tilesToFlip = tilesToFlip.concat(cache);
        break;
      }
      move();
    }
    resetXY();
  };

  check(() => y > 0, () => up());
  check(() => y <= maxIndex, () => down());
  check(() => x > 0, () => left());
  check(() => x <= maxIndex, () => right());

  check(() => y > 0 && x > 0, () => upLeft());
  check(() => y > 0 && x <= maxIndex, () => upRight());
  check(() => y <= maxIndex && x > 0, () => downLeft());
  check(() => y <= maxIndex && x <= maxIndex, () => downRight());

  return tilesToFlip;
};

export const canTileBePlaced = (
  player: Player,
  tiles: TileModel[][]
): boolean => {
  for (let x = 0; x <= maxIndex; x++) {
    for (let y = 0; y <= maxIndex; y++) {
      let tile = tiles[y][x];

      if (tile.player) continue;

      const flippable = analyseTilesToBeFlipped(player, tile, tiles);

      if (flippable.length > 1) {
        return true;
      }
    }
  }

  return false;
};

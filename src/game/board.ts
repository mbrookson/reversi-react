import { TileModel } from '../components/tile/Tile';
import { Player } from './player';

const maxX = 7;
const maxY = 7;

export const generateTiles = () => {
  const tiles: TileModel[][] = [];

  for (let y = 0; y <= maxX; y++) {
    tiles[y] = [];
    for (let x = 0; x <= maxX; x++) {
      tiles[y][x] = { x, y };

      const defaultTile = defaultTiles.find(t => t.x === x && t.y === y);

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
  { x: 4, y: 3, player: Player.White }
];

export const immutableMapTiles = (
  tiles: TileModel[][],
  callback: (tile: TileModel) => TileModel
): TileModel[][] => {
  return [
    ...tiles.map(row => [
      ...row.map(t => {
        return callback({ ...t });
      })
    ])
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
  };
  const downRight = () => {
    x++;
    y++;
  };

  const check = (condition: () => boolean, move: () => void) => {
    let cache: TileModel[] = [];
    while (condition()) {
      let tile = tiles[y][x];
      if (
        !tile.player &&
        (tile.x !== selectedTile.x || tile.y !== selectedTile.y)
      ) {
        break;
      } else if (tile.player && tile.player !== currentPlayer) {
        cache.push(tile);
      } else if (tile.player && tile.player === currentPlayer) {
        tilesToFlip = tilesToFlip.concat(cache);
        break;
      }
      move();
    }
    resetXY();
  };

  check(() => y > 0, () => up());
  check(() => y <= maxY, () => down());
  check(() => x > 0, () => left());
  check(() => x <= maxX, () => right());

  check(() => y > 0 && x > 0, () => upLeft());
  check(() => y > 0 && x <= maxX, () => upRight());
  check(() => y <= maxY && x > 0, () => downLeft());
  check(() => y <= maxY && x <= maxX, () => downRight());

  return tilesToFlip;
};

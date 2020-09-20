import React, { useEffect, useRef, useState } from 'react';
import {
  generateTiles,
  immutableMapTiles,
  analyseTilesToBeFlipped,
} from '../../game/board';
import { Tile, TileModel } from '../tile/Tile';
import { usePlayer } from '../../context/PlayerProvider';
import { useMessages } from '../../context/MessageProvider';

export const Board: React.FC = () => {
  const { currentPlayer, toggleCurrentPlayer } = usePlayer();
  const { setMessage } = useMessages();
  const [tiles, setTiles] = useState<TileModel[][]>([]);
  const board = useRef<HTMLDivElement>(null);

  let height = board && board.current ? board.current.offsetWidth : 0;

  useEffect(() => {
    setTiles(generateTiles());
  }, [setTiles]);

  const key = (x: number, y: number) => `${x},${y}`;

  const handleSelectTile = (selectedTile: TileModel) => {
    if (selectedTile.player) {
      setMessage('Counter already placed here.');
      return;
    }

    const tilesToFlip = analyseTilesToBeFlipped(
      currentPlayer,
      selectedTile,
      tiles
    );

    if (tilesToFlip.length === 1) {
      setMessage('Counter must be places adjacent to another counter.');
      return;
    }

    const newTiles = immutableMapTiles(tiles, (tile) => {
      if (tilesToFlip.find((t) => t.x === tile.x && t.y === tile.y)) {
        tile.player = currentPlayer;
      }
      return tile;
    });

    setTiles(newTiles);

    toggleCurrentPlayer();
  };

  return (
    <div
      ref={board}
      style={{ height }}
      className="grid grid-cols-8 grid-rows-8 gap-1 bg-white border-4 border-white w-5/6 md:w-1/3 mx-auto rounded"
    >
      {tiles.map((rows) =>
        rows.map((tile) => (
          <Tile
            key={key(tile.x, tile.y)}
            x={tile.x}
            y={tile.y}
            player={tile.player}
            onClick={handleSelectTile}
          />
        ))
      )}
    </div>
  );
};

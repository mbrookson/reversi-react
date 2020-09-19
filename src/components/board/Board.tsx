import React, { useEffect, useState } from 'react';
import styles from './Board.module.scss';
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
    <div className={[styles.board, 'rounded'].join(' ')}>
      {tiles.map((rows) =>
        rows.map((tile) => (
          <Tile
            key={key(tile.x, tile.y)}
            x={tile.x}
            y={tile.y}
            player={tile.player}
            onClick={(tile) => handleSelectTile(tile)}
          />
        ))
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import styles from './Board.module.scss';
import { generateTiles, immutableMapTiles } from '../../game/board';
import { Tile, TileModel } from '../tile/Tile';
import { usePlayer } from '../../context/PlayerProvider';
import { analyseTilesToBeFlipped } from '../../game/board';

export const Board: React.FC = () => {
  const { currentPlayer, toggleCurrentPlayer } = usePlayer();
  const [tiles, setTiles] = useState<TileModel[][]>([]);

  useEffect(() => {
    setTiles(generateTiles());
  }, [setTiles]);

  const key = (x: number, y: number) => `${x},${y}`;

  const handleSelectTile = (selectedTile: TileModel) => {
    if (selectedTile.player) return;

    const tilesToFlip = analyseTilesToBeFlipped(
      currentPlayer,
      selectedTile,
      tiles
    );

    console.log(tilesToFlip);
    const newTiles = immutableMapTiles(tiles, tile => {
      if (tilesToFlip.find(t => t.x === tile.x && t.y === tile.y)) {
        tile.player = currentPlayer;
      }
      return tile;
    });

    setTiles(newTiles);

    toggleCurrentPlayer();
  };

  return (
    <div className={styles.board}>
      {tiles.map(rows =>
        rows.map(tile => (
          <Tile
            key={key(tile.x, tile.y)}
            x={tile.x}
            y={tile.y}
            player={tile.player}
            onClick={tile => handleSelectTile(tile)}
          />
        ))
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import styles from './Board.module.scss';
import { generateTiles } from '../../game/board';
import { Tile, TileModel } from '../tile/Tile';
import { usePlayer } from '../../context/PlayerProvider';

export const Board: React.FC = () => {
  const { currentPlayer, toggleCurrentPlayer } = usePlayer();
  const [tiles, setTiles] = useState<TileModel[][]>([]);

  useEffect(() => {
    setTiles(generateTiles());
  }, [setTiles]);

  const key = (x: number, y: number) => `${x},${y}`;

  const handleSelectTile = (tile: TileModel) => {
    if (tile.player !== undefined) return;

    setTiles([
      ...tiles.map((row, x) => [
        ...row.map((t, y) => {
          const isMatch = tile.x === x && tile.y === y;
          return { ...t, player: isMatch ? currentPlayer : t.player };
        })
      ])
    ]);

    toggleCurrentPlayer();
  };

  return (
    <div className={styles.board}>
      {tiles.map((rows, x) =>
        rows.map(tile => (
          <Tile
            key={key(x, tile.y)}
            x={x}
            y={tile.y}
            player={tile.player}
            onClick={tile => handleSelectTile(tile)}
          />
        ))
      )}
    </div>
  );
};

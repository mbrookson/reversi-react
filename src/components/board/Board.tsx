import React, { useState, useEffect } from 'react';
import styles from './Board.module.scss';
import { generateTiles, defaultTiles } from '../../game/board';
import { Tile, TileModel } from '../tile/Tile';
import { Player } from '../../game/player';

interface Props {
  currentPlayer: Player;
  onTurnChange: (nextPlayer: Player) => void;
}

export const Board: React.FC<Props> = (props) => {
  const { onTurnChange } = props;
  const [tiles, setTiles] = useState<TileModel[][]>(generateTiles());
  const [blackTiles, setBlackTiles] = useState<TileModel[]>([]);
  const [whiteTiles, setWhiteTiles] = useState<TileModel[]>([]);
  const [turn, setTurn] = useState<Player>(props.currentPlayer);
 
  useEffect(() => {
    setBlackTiles(defaultTiles.filter(t => t.player === Player.Black));
    setWhiteTiles(defaultTiles.filter(t => t.player === Player.White));
  }, [])

  useEffect(() => {
    onTurnChange(turn);
  }, [turn, onTurnChange])

  const key = (x: number, y: number) => `${x},${y}`;

  blackTiles.forEach(tile => {
    tiles[tile.x][tile.y].player = tile.player;
  });

  whiteTiles.forEach(tile => {
    tiles[tile.x][tile.y].player = tile.player;
  });

  const selectTile = (tile: TileModel) => {
    if (!tile.player) {
      const newTiles = [...tiles];
      newTiles[tile.x][tile.y].player = turn;
      setTiles(newTiles);
    }

    setTurn(turn === Player.Black ? Player.White : Player.Black);
  };

  return (
    <div className={styles.board}>
      {tiles.map((rows, x) => rows.map(tile => (
        <Tile
          key={key(x,tile.y)}
          x={x}
          y={tile.y}
          player={tile.player}
          onClick={tile => selectTile(tile)}
        />
      )))}
    </div>
  )
};

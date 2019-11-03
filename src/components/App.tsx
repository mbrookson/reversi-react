import React, { useState } from 'react';
import styles from './App.module.scss';
import { Board } from './board/Board';
import { Player } from '../game/player';
import { CurrentPlayer } from './currentPlayer/CurrentPlayer';

const App: React.FC = () => {
  const [turn, setTurn] = useState<Player>(Player.White);

  return (
    <div className={styles.app}>
      <header>
        <h1>Othello</h1>
      </header>
      <CurrentPlayer player={turn} />
      <Board currentPlayer={turn} onTurnChange={setTurn} />
    </div>
  );
}

export default App;

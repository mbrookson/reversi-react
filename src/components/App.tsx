import React from 'react';
import styles from './App.module.scss';
import { Game } from './game/Game';
import { PlayerProvider } from '../context/PlayerProvider';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <div className={styles.app}>
        <header>
          <h1>Reversi</h1>
        </header>
        <Game />
      </div>
    </PlayerProvider>
  );
};

export default App;

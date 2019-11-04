import React from 'react';
import styles from './App.module.scss';
import { Game } from './game/Game';
import Provider from './StoreProvider';

const App: React.FC = () => {
  return (
    <Provider>
      <div className={styles.app}>
        <header>
          <h1>Othello</h1>
        </header>
        <Game />
      </div>
    </Provider>
  );
};

export default App;

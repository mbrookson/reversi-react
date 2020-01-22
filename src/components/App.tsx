import React from 'react';
import { Game } from './game/Game';
import { PlayerProvider } from '../context/PlayerProvider';
import { MessageProvider } from '../context/MessageProvider';

const App: React.FC = () => {
  return (
    <MessageProvider>
      <PlayerProvider>
        <div className="bg-gray-800 flex flex-col align-middle justify-center min-h-screen text-white text-center">
          <header>
            <h1 className="text-5xl font-bold mb-8">Reversi</h1>
          </header>
          <Game />
        </div>
      </PlayerProvider>
    </MessageProvider>
  );
};

export default App;

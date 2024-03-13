import { useState } from 'react';

import GameStart from './components/GameStart/GameStart';
import Game from './components/Game/Game';

import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStarted(prev => !prev);
  };

  return (
    <div className="app">
      <main>
        {!gameStarted ? (
          <GameStart onStartGame={handleStartGame} />
        ) : (
          <Game setGame={handleStartGame} />
        )}
      </main>
    </div>
  );
};

export default App;

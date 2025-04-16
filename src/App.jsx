import React from 'react';
import YouTubePlayer from './components/Player/Player';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weini's Music Player</h1>
      </header>
      
      <main className="content">
        <div className="player">
          <YouTubePlayer />
        </div>
      </main>

      
    </div>
  );
};

export default App;
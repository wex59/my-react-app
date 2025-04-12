import React from 'react';
import YouTubePlayer from './components/Player/Player';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Music Player</h1>
      </header>

      <main className="content">
        <div className="description">
          
        </div>
      </main>

      <YouTubePlayer />
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import YouTubePlayer from './components/Player/Player';
import './App.css';

// Import background images
import bg1 from '../src/assets/backgrounds/bg1.png';
import bg2 from '../src/assets/backgrounds/bg2.jpg';


const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(bg1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const backgrounds = [bg1, bg2];

  return (
    <div className="app-container" style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <header className="app-header">
        <h1>Weini's Music Player</h1>

      </header>
      
      <div className="playlist-info">
          <button className="help-icon" onClick={() => setShowPlaylist(!showPlaylist)} aria-label="Show playlist">❔</button>
          {showPlaylist && (
            <div className="playlist-dropdown">
              <h3>Current YouTube Playlist:</h3>
              <p>ID: PLIIPaNcOfLfxJZ6rEVHT5Kko-GDvEe8gD</p>
              <a 
                href="https://www.youtube.com/playlist?list=PLIIPaNcOfLfxJZ6rEVHT5Kko-GDvEe8gD"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in YouTube
              </a>
            </div> // This closing div was missing
          )}
      </div>

      <main className="content">
        
        <div className="player">
          <YouTubePlayer 
            backgrounds={backgrounds} 
            onTrackChange={setBackgroundImage} 
          />
        </div>

        
      </main>
    </div>
  );
};

export default App;
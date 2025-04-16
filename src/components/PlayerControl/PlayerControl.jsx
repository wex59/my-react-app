import React from 'react';
import './PlayerControl.css';

const PlayerControls = ({
  isPlaying,
  currentTrack,
  togglePlay,
  nextVideo,
  previousVideo
}) => {
  return (
    <div className="player-controls">
      <div className='controls-div'>
        <button className="control-btn" onClick={previousVideo}>
          ⏮
        </button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn" onClick={nextVideo}>
          ⏭
        </button>
      </div>
      <div className="track-info">
        {currentTrack || 'Loading playlist...'}
      </div>
    </div>
  );
};

export default PlayerControls;
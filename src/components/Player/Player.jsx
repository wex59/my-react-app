import { useState, useEffect, useRef } from 'react';
import PlayerControls from '../PlayerControl/PlayerControl';
import './Player.css';

const YouTubePlayer = ({ backgrounds, onTrackChange }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const playlistId = 'PLIIPaNcOfLfxJZ6rEVHT5Kko-GDvEe8gD';

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    };

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = initializePlayer;
      loadYouTubeAPI();
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (backgrounds.length > 0) {
      const newIndex = bgIndex % backgrounds.length;
      onTrackChange(backgrounds[newIndex]);
    }
  }, [bgIndex, backgrounds, onTrackChange]);

  const initializePlayer = () => {
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        listType: 'playlist',
        list: playlistId,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: handlePlayerReady,
        onStateChange: handleStateChange,
        onError: handlePlayerError
      }
    });
  };

  const handlePlayerReady = (event) => {
    event.target.playVideo();
    updateTrackInfo(event.target);
    setIsPlaying(true);
  };

  const handleStateChange = (event) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
    if (event.data === window.YT.PlayerState.ENDED) {
      event.target.nextVideo();
    }
    updateTrackInfo(event.target);
  };

  const handlePlayerError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  const updateTrackInfo = (player) => {
    try {
      const data = player.getVideoData();
      setCurrentTrack(data.title);
      // Cycle to next background image
      setBgIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching track info:', error);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  //change background image
  const handleTrackChange = () => {
    setBgIndex(prev => prev + 1);
  };

  const nextVideo = () => {
    playerRef.current.nextVideo();
    handleTrackChange();
  };

  const previousVideo = () => {
    playerRef.current.previousVideo();
    handleTrackChange();
  };

  return (
    <div className="youtube-player-container">
      <div id="youtube-player"></div>
      <PlayerControls
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        togglePlay={togglePlayback}
        nextVideo={nextVideo}
        previousVideo={previousVideo}
      />
    </div>
  );
};

export default YouTubePlayer;
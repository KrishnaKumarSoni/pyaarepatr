import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, HStack } from '@chakra-ui/react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

// Array of romantic songs
const SONGS = [
  'dQw4w9WgXcQ', // Never Gonna Give You Up
  'YskqvyX1W7M', // Can't Help Falling In Love
  'rtOvBOTyX00', // Perfect
  'JGwWNGJdvx8', // Shape of You
  '2Vv-BfVoq4g', // Perfect
];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  onPlay?: () => void;
}

export default function MusicPlayer({ onPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const [currentSong] = useState(SONGS[Math.floor(Math.random() * SONGS.length)]);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentSong,
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
        },
        events: {
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [currentSong]);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <Box>
      <div id="youtube-player" style={{ display: 'none' }} />
      <HStack spacing={2}>
        <IconButton
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlay}
          colorScheme="pink"
          variant="outline"
        />
        <IconButton
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          onClick={toggleMute}
          colorScheme="pink"
          variant="outline"
        />
      </HStack>
    </Box>
  );
} 
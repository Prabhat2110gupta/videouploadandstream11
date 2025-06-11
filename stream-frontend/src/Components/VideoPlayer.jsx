import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Only initialize ONCE
  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: false,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Update source separately when src changes
  useEffect(() => {
    if (playerRef.current && src) {
      playerRef.current.src({ src, type: 'application/x-mpegURL' });
      playerRef.current.load();
      playerRef.current.play();
    }
  }, [src]);

  return (
    <div data-vjs-player style={{ width: '640px', height: '360px' }}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;

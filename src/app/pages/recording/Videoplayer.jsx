import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ videourl, style }) => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    let newHls = null;

    const initializeHls = async () => {
        if (!videourl) {
            console.error('Video URL is undefined or null.');
            return;
          }
        
          const trimmedVideoUrl = videourl.trim();
      if (Hls.isSupported()) {
        newHls = new Hls();
        newHls.loadSource(trimmedVideoUrl);
        newHls.attachMedia(videoRef.current);

        newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log('Media attached');
        });

        newHls.on(Hls.Events.MANIFEST_LOADED, () => {
          console.log('Manifest loaded');

          // Start playing the video when the manifest is loaded
          if (isMounted && !isVideoPlaying) {
            newHls.startLoad();
            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                  console.error('Error playing video:', error);
                });
                setIsVideoPlaying(true);
              }
            }
        });

        newHls.on(Hls.Events.ERROR, (event, data) => {
          console.error('Error:', data);
        });

        setHls(newHls);
      } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = trimmedVideoUrl;
      } else {
        console.error('HLS is not supported on this browser or player not properly initialized.');
      }
    };

    initializeHls();

    return () => {
      // Clean up Hls.js and set isMounted to false when the component unmounts
      if (newHls) {
        newHls.destroy();
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }

      setIsMounted(false);
    };
  }, [videourl, isVideoPlaying, isMounted]);

  const handlePlay = () => {
    if (hls && isMounted && !isVideoPlaying) {
      hls.startLoad();
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
      setIsVideoPlaying(true);
    }
  };

  return (
    <div>
         <video
      className='video-monitor'
      ref={videoRef}
      controls
      autoPlay
      style={{ border: '2px solid white' }}
    />
      {/* Use handlePlay() instead of videoRef.current.play() in your play button click handler */}
      {/* <button onClick={handlePlay}>Play</button> */}
    </div>
  );
};

export default VideoPlayer;


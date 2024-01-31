import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import axios from 'axios';

const VideoPlayer = ({ source, style }) => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchAndPlayVideo = async () => {
      try {
        const response = await axios.post('http://192.168.1.19:3000/playback', {
          camera_name: 'camera4',
          record: 'false',
        });

        const { live_stream_url } = response.data;

        if (Hls.isSupported()) {
          const newHls = new Hls();
          newHls.loadSource(live_stream_url);
          newHls.attachMedia(videoRef.current);

          newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log('Media attached');
          });

          newHls.on(Hls.Events.MANIFEST_LOADED, () => {
            console.log('Manifest loaded');

            if (isMounted && !isVideoPlaying) {
              newHls.startLoad();
              videoRef.current.play().catch(error => {
                console.error('Error playing video:', error);
              });
              setIsVideoPlaying(true);
            }
          });

          newHls.on(Hls.Events.ERROR, (event, data) => {
            console.error('Error:', data);
          });

          setHls(newHls);
        } else {
          console.error('HLS is not supported');
        }
      } catch (error) {
        console.error('Error fetching or playing video:', error);
      }
    };

    fetchAndPlayVideo();

    return () => {
      // Clean up Hls.js and set isMounted to false when the component unmounts
      if (hls) {
        hls.destroy();
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }

      setIsMounted(false);
    };
  }, [isMounted, isVideoPlaying]);

  return (
    <div style={{ position: 'relative', ...style }}>
      <video ref={videoRef} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
};

export default VideoPlayer;







// import React, { useRef, useEffect, useState } from 'react';
// import Hls from 'hls.js';

// const VideoPlayer = ({ style,source }) => {
//   const videoRef = useRef(null);
//   const [hls, setHls] = useState(null);
//   const [isMounted, setIsMounted] = useState(true);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   useEffect(() => {
//     let newHls = null;

//     const initializeHls = async () => {
//       if (Hls.isSupported()) {
//         newHls = new Hls();
//         newHls.loadSource(source);
//         newHls.attachMedia(videoRef.current);

//         newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
//           console.log('Media attached');
//         });

//         newHls.on(Hls.Events.MANIFEST_LOADED, () => {
//           console.log('Manifest loaded');

//           // Start playing the video when the manifest is loaded
//           if (isMounted && !isVideoPlaying) {
//             newHls.startLoad();
//             videoRef.current.play().catch(error => {
//               console.error('Error playing video:', error);
//             });
//             setIsVideoPlaying(true);
//           }
//         });

//         newHls.on(Hls.Events.ERROR, (event, data) => {
//           console.error('Error:', data);
//         });

//         setHls(newHls);
//       } else {
//         console.error('HLS is not supported');
//       }
//     };

//     initializeHls();

//     return () => {
//       // Clean up Hls.js and set isMounted to false when the component unmounts
//       if (newHls) {
//         newHls.destroy();
//       }

//       if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.removeAttribute('src');
//         videoRef.current.load();
//       }

//       setIsMounted(false);
//     };
//   }, [source, isVideoPlaying, isMounted]);

//   const handlePlay = () => {
//     if (hls && isMounted && !isVideoPlaying) {
//       hls.startLoad();
//       videoRef.current.play().catch(error => {
//         console.error('Error playing video:', error);
//       });
//       setIsVideoPlaying(true);
//     }
//   };

//   return (
//     <div style={{ position: 'relative', ...style }}>
//       <video ref={videoRef} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
//       {/* Use handlePlay() instead of videoRef.current.play() in your play button click handler */}
//       {/* <button onClick={handlePlay}>Play</button> */}
//     </div>
//   );
// };

// export default VideoPlayer;


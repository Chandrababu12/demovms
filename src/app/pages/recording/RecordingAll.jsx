
import React, { useRef, useState, useEffect } from 'react';
import { Range } from 'react-range';
import { Tooltip } from 'react-tooltip';
import Hls from 'hls.js';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Container, Row, Col, Button,Form} from 'react-bootstrap';


const VideoEditor = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineValues, setTimelineValues] = useState([0, 100]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  let hls = new Hls();
  const [date, setDate] = useState('');
  // const [thumbnails, setThumbnails] = useState([]);
  const hlsInstances = useRef([
    new Hls(),
    new Hls(),
    new Hls(),
    new Hls(),
    new Hls(),
  ]);

 
 
  const fetchVideoUrl = async () => {
    try {
      const response = await fetch('http://192.168.1.56:5001/get_recording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cameras: [
            { camera_name: 'camera1', date: date },
            { camera_name: 'camera2', date: date },
            { camera_name: 'camera3', date: date },
            { camera_name: 'camera4', date: date },
            { camera_name: 'camera5', date: date },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching video URLs: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data:', data);

      if (!data.recordings || !Array.isArray(data.recordings) || data.recordings.length === 0) {
        console.error('Recordings data is not valid:', data.recordings);
        return;
      }

      const videoUrl = data.recordings.map((recording) => recording.modified_m3u8_path);

      videoUrl.forEach(async (videoUrl, index) => {
        try {
          const videoElement = document.createElement('video');
          videoElement.src = videoUrl;
          videoElement.controls = true;
          videoElement.autoplay = true;

          const container = document.getElementById(`video-container-${index}`);
          container.innerHTML = '';
          container.appendChild(videoElement);

          await videoElement.play();

          console.log(`Video ${index + 1} played successfully.`);
        } catch (error) {
          console.error(`Error playing video ${index + 1}:`, error.message);
        }
      });
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

    useEffect(() => {
      fetchVideoUrl();
  
      return () => {
        hlsInstances.current.forEach((hls) => {
          if (hls) {
            hls.destroy();
          }
        });
      };
    }, [date]);
 {/* useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailInterval = 10; // Set the interval in seconds
      const thumbnailCount = Math.floor(videoDuration / thumbnailInterval);
      const thumbnailsArray = [];
  
      for (let i = 0; i < thumbnailCount; i++) {
        const thumbnailTime = i * thumbnailInterval;
        console.log('Generating thumbnail at time:', thumbnailTime);
        const thumbnailDataURL = await generateThumbnail(thumbnailTime);
        thumbnailsArray.push({ time: thumbnailTime, dataURL: thumbnailDataURL });
      }
  
      setThumbnails(thumbnailsArray);
    };
  
  

    const generateThumbnail = async (time) => {
      return new Promise((resolve, reject) => {
        try {
          const videoElement = playerRef.current;
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          const handleCanPlayThrough = () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL('image/jpeg'));
          };

          // Add event listener for the canplaythrough event
          videoElement.addEventListener('canplaythrough', handleCanPlayThrough);

          // Set the current time to trigger the loading of the frame
          videoElement.currentTime = time;
        } catch (error) {
          console.error('Error in generateThumbnail:', error);
          reject(error);
        }
      });
    };

    // Generate and display the first thumbnail
    generateThumbnail(5)
      .then((thumbnailDataURL) => {
        console.log('Thumbnail Data URL:', thumbnailDataURL);
        setThumbnails([{ time: 5, dataURL: thumbnailDataURL }]);
      })
      .catch((error) => console.error('Error generating thumbnail:', error));
  }, []);*/}



  const handlePlay = async () => {
    if (hls && playerRef.current) {
      await playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = async () => {
    if (hls && playerRef.current) {
      await playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Use the effect to automatically pause the video after the selected duration
    let playTimeout;
    if (isPlaying && playerRef.current) {
      playTimeout = setTimeout(async () => {
        await handlePause();
      }, (endTime - startTime) * 1000);
    }

    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(playTimeout);
    };
    
  }, [isPlaying, startTime, endTime]);

  const handleTimelineChange = (values) => {
    setTimelineValues(values);
  };

  const handleFinalChange = async (values) => {
    const newStartTime = values[0];
    const newEndTime = values[1];

    setStartTime(newStartTime);
    setEndTime(newEndTime);

    // Set the current time to the selected start time
    if (playerRef.current) {
      playerRef.current.currentTime = newStartTime;
    }

    // Start playing
    await handlePlay();
  };

  // New function to handle user-selected date
  


  
  const handleCrop = () => {
    console.log(`Video cropped from ${startTime} to ${endTime} `);
  };

  
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 100 ? '' : ''}${remainingSeconds}`;
  };

 {/* const renderThumbnails = () => {
    const nextThumbnailIndex = thumbnails.findIndex(
      (thumbnail) => thumbnail.time > endTime
    );
  
    return thumbnails.map((thumbnail, index) => (
      <Image
        key={index}
        src={thumbnail.dataURL}
        alt={`Thumbnail at ${formatTime(thumbnail.time)}`}
        style={{
          position: 'absolute',
          height: '13vh',
          width: 'auto',
          left: `${(thumbnail.time / videoDuration) * 100}%`,
          transform: 'translateX(-50%)',
        }}
      />
    )).concat(
      nextThumbnailIndex !== -1 && (
        <Image
          key={`next-thumbnail`}
          src={thumbnails[nextThumbnailIndex].dataURL}
          alt={`Next Thumbnail`}
          style={{
            position: 'absolute',
            height: '10vh',
            width: 'auto',
            left: `${(thumbnails[nextThumbnailIndex].time / videoDuration) * 100}%`,
            transform: 'translateX(-50%)',
            border: '2px solid #00FF00', // Border color for the next thumbnail
          }}
        />
      )
    );
  };
*/}
  

  const renderScale = () => {
    const scaleSteps = Math.floor((videoDuration || 10) / 10) + 1;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        {[...Array(scaleSteps)].map((_, index) => (
          <div
            key={index}
            style={{
              height: '20px',
              width: '1px',
              background: '#000',
            }}
          />
        ))}
      </div>
    );
  };

  const renderClock = () => {
    const clockSteps = Math.floor(videoDuration ||100 ) + 1;
    const clockStepWidth = 100 / clockSteps;

    return (
      <div style={{ marginTop: '10px', position: 'relative' }}>
        {[...Array(clockSteps)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${index * clockStepWidth}%`,
              top: '-30px',
            }}
          >
            <div
              style={{
                height: index % 10 === 0 ? '20px' : '10px',
                width: '1px',
                background: '#fff',
              }}
            />
            {index % 10 === 0 && (
              <div style={{ textAlign: 'center' }}>{formatTime(index)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container className='container h-100vh w-100vw ' style={{  color: 'white' ,}}>
      {(playerRef.current ?? []).map((playerRef, index) => (
      <TransformWrapper key={`transformWrapper-${index}`}>
        <TransformComponent>
        {playerRef.current.map((_, index) => (
        <div key={`video-container-${index}`} id={`video-container-${index}`} />
      ))}
        </TransformComponent>
      </TransformWrapper>
    ))}
      <Row>
        <Col>
          <Range
            values={timelineValues}
            step={0.5}
            min={0}
            max={videoDuration || 100}
            onChange={(values) => {handleFinalChange(values);    handleTimelineChange(values); }}
            onFinalChange={(values) => {
              handleFinalChange(values); 
              handleTimelineChange(values);
            }}
            renderThumb={({ props ,isDragged}) => (
              <div
              
                {...props}
                
                style={{
                  ...props.style,
                  height: '2vh',
                  width: '1vw',
                  borderRadius: '50%',
                  backgroundColor: isDragged ? 'white' : 'red', 
                  boxShadow: '0px 2px 6px #AAA',
                  
                }}
               
              /> 
            )}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '30vh',
                  display: 'flex',
                  width: '78vw',
                  overflow:'hidden'
                
                }}
                data-tip={`Start: ${formatTime(startTime)} | End: ${formatTime(endTime)}`}
              >
                
                <div
                  ref={props.ref}
                  style={{
                    height: '15vh',
                    width: '100vw',
                    borderRadius: '4px',
                  
                    alignSelf: 'center',
                    position: 'relative',
                    border: '5px solid #fff',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: `${(startTime / (videoDuration || 100)) * 100}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {formatTime(startTime)}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: `${(endTime / (videoDuration || 100)) * 100}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {formatTime(endTime)}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      height: '20vh',
                      width: `${((endTime - startTime) / (videoDuration || 100)) * 100}%`,
                      left: `${(startTime / (videoDuration || 100)) * 100}%`,
                    }}
                  />
                  
                  <div
                    style={{
                      position: 'absolute',
                      height: '3vh',
                      width: '4px',
                      background: 'red', // Customize the color of the clip track
                      left: `${(endTime / (videoDuration || 100)) * 100 - 2}%`,
                    }}
                  />
                  
                  {/* {renderThumbnails()} */}
                  {children}
                  {/* Display scale and clock */}
                  {renderScale()}
                  {renderClock()}

                </div>
              </div>
            )}
        
          />
        </Col>
      </Row>
      <Row>
       <Col>
        <Form>

      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-1 col-form-label">Date</Form.Label>
          <Col sm={2}>
            <Form.Control
            type="date"
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
         </Col>
       </Form.Group>



          {/*<Form.Group className="mb-3">
             <Form.Label>Time</Form.Label>
               <Col sm={2}>
             <Form.Control
               type="time"
               placeholder="Enter time"
               value={time}
               onChange={(e) => setTime(e.target.value)}
             />
              </Col>
           </Form.Group>
                  <Button onClick={() => fetchVideoUrl()}>Click me</Button>*/}
         </Form>
       </Col>
     </Row>

      <Row>
        <Col>
        <p>Selected Range: {formatTime(startTime)} - {formatTime(endTime)}</p>
          <p>Range Duration: {formatTime(endTime - startTime)}</p>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button className="btn ms-5" onClick={() => {
            if (hls && playerRef.current) { isPlaying ? handlePause() : handlePlay();
            } else {
             console.log('HLS not available or player not initialized properly'); }
              }}>
            {isPlaying ? 'Pause' : 'Play'}
        </Button>


          <Button className="btn  ms-5" onClick={handleCrop}>Crop Video</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tooltip place="top" type="dark" effect="solid" />
        </Col>
      </Row>
    </Container>
  );
};

export default VideoEditor; 
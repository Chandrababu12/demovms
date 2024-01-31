import React, {useRef, useState, useEffect} from 'react'
import {Range} from 'react-range'
import {Tooltip} from 'react-tooltip'
import Hls from 'hls.js'
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'
import 'rsuite/dist/rsuite.min.css'
import {DateRangePicker} from 'rsuite'
import {FaCalendar} from 'react-icons/fa'
// import {BsCalendar2MonthFill} from 'react-icons/bs'

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ProgressBar,
  Badge,
} from 'react-bootstrap'
// import DateTimePicker from 'react-datetime-picker'
import {
  Camera,
  // Stopwatch,
  Calendar,
  // Calendar2CheckFill,
  Rewind,
  Reply,
  ReplyAll,
  PlayCircle,
  FastForward,
  PauseCircle,
  Crop,
  Clock,
} from 'react-bootstrap-icons'

const VideoEditor = () => {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoUrl, setVideoUrl] = useState('');
  let hls = new Hls()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  // const [thumbnails, setThumbnails] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false)
  const [snapshotDataUrl, setSnapshotDataUrl] = useState(null)
  const fetchVideoUrl = async () => {
    try {
      const response = await fetch('http://192.168.1.20:3000/recording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "id": "113",
          "date": "2024-01-25",
          "time": "13:13:00",
          "duration": "60",
          "format": "fmp4"
        }),
      });

      if (!response.ok) {
        throw new Error(`Fetching video URL failed with status: ${response.status}`);
      }

      const data = await response.json();
      const videoUrl = data.url;

      if (!videoUrl) {
        console.error('Video URL is missing in the response.');
        return;
      }

      console.log('Video URL:', videoUrl);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, []);

  useEffect(() => {
    if (videoUrl && playerRef.current) {
      // Now that you have the video URL, you can play it.
      playerRef.current.src = videoUrl;
      playerRef.current.play();
    }
  }, [videoUrl]);
  {
    /* useEffect(() => {
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
  }, []);*/
  }

  const handlePlay = async () => {
    if (hls && playerRef) {
      await playerRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = async () => {
    if (hls && playerRef.current) {
      await playerRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    // Use the effect to automatically pause the video after the selected duration
    let playTimeout
    if (isPlaying && playerRef.current) {
      playTimeout = setTimeout(async () => {
        await handlePause()
      }, (endTime - startTime) * 1000)
    }

    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(playTimeout)
    }
  }, [isPlaying, startTime, endTime])

  const handleFinalChange = async (values) => {
    const newStartTime = values[0]
    const newEndTime = values[1]

    setStartTime(newStartTime)
    setEndTime(newEndTime)

    // Set the current time to the selected start time
    if (playerRef.current) {
      playerRef.current.currentTime = newStartTime
    }

    // Start playing
    await handlePlay()
  }

  // New function to handle user-selected date

  const handleCrop = () => {
    // Open the modal when Crop Video is clicked
    handleShowModal()
  }

  const handleSave = () => {
    // Add logic for saving the cropped video
    console.log(`Video cropped from ${startTime} to ${endTime}. Saved successfully.`)

    // You can use the download attribute to trigger a download
    const blob = new Blob(['Cropped video data'], {type: 'video/mp4'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cropped_video.mp4'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Close the modal after saving
    handleCloseModal()
  }

  const shareVideo = async () => {
    // Add logic for sharing the cropped video
    console.log(`Video cropped from ${startTime} to ${endTime}. Shared successfully.`)

    // Example: Using a hypothetical shareVideo API
    try {
      const response = await fetch('https://api.example.com/share-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime,
          endTime,
          // Add any other necessary data for sharing
        }),
      })

      if (!response.ok) {
        throw new Error(`Sharing video failed with status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Share video result:', result)
    } catch (error) {
      console.error('Error sharing video:', error.message)
    }

    // Close the modal after sharing
    handleCloseModal()
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 100 ? '' : ''}${remainingSeconds}`
  }

  const handleReplay = (seconds) => {
    if (playerRef.current) {
      playerRef.current.currentTime -= seconds
      setStartTime(playerRef.current.currentTime)
    }
  }

  const handleFastForward = (seconds) => {
    if (playerRef.current) {
      playerRef.current.currentTime += seconds
      setStartTime(playerRef.current.currentTime)
    }
  }

  const handleAudioToggle = () => {
    if (playerRef.current) {
      playerRef.current.muted = !audioEnabled
    }
    setAudioEnabled(!audioEnabled)
  }

  const handleSnapshot = () => {
    const video = playerRef.current

    // Ensure the video is loaded
    if (video) {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Get the data URL of the canvas
      const dataUrl = canvas.toDataURL('image/png')
      setSnapshotDataUrl(dataUrl)

      // Open the snapshot modal
      setIsSnapshotModalOpen(true)
    }
  }

  const handleSaveSnapshot = () => {
    // Save the snapshot dataUrl to the local system
    const link = document.createElement('a')
    link.href = snapshotDataUrl
    link.download = 'snapshot.png'
    link.click()

    // Close the snapshot modal
    setIsSnapshotModalOpen(false)
  }

  

  {
    /* const renderThumbnails = () => {
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
*/
  }

  const calculateClockSteps = () => {
    const clockSteps = Math.floor(videoDuration / 10000) + 1
    const clockStepWidth = 100 / clockSteps
    return {clockSteps, clockStepWidth}
  }

  const renderClock = () => {
    const {clockSteps, clockStepWidth} = calculateClockSteps()

    return (
      <div style={{marginTop: '10px', position: 'relative', overflowX: 'auto', width: '100%'}}>
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
            {index % 10 === 0 && <div style={{textAlign: 'center'}}>{formatTime(index * 100)}</div>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Container className='container video-container' style={{color: 'white', display: 'block' }}>
        {/* Video Player */}
        <TransformWrapper className='video-monitor-0'>
  <TransformComponent className='video-monitor-1'>
    {videoUrl ? (
      <video
        ref={playerRef}
        controls
        autoPlay
        width="100%"
        height="auto"
        crossOrigin="anonymous" 
      >
        <source src={videoUrl} type="video/fmp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <video
        controls
        width="100%"
        height="auto"
        crossOrigin="anonymous" 
      />
    )}
  </TransformComponent>
</TransformWrapper>


        {/* Playback Timeline */}
        <Row className='mt-10'>
          <Col>
            <Range
              values={[startTime, endTime]}
              step={5}
              min={0}
              max={100000}
              onChange={(values) => {
                handleFinalChange(values)
              }}
              onFinalChange={(values) => {
                handleFinalChange(values)
              }}
              renderThumb={({props, isDragged}) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '2vh',
                    width: '0.3vw',
                    borderRadius: '50%',
                    backgroundColor: isDragged ? 'black' : 'red',
                    boxShadow: '0px 2px 6px #AAA',
                  }}
                />
              )}
              renderTrack={({props, children}) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '5vh',
                    display: 'block',
                    width: '76vw',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <ProgressBar
                    ref={props.ref}
                    now={endTime - startTime}
                    style={{
                      height: '10px',
                      width: '100%',
                      borderRadius: '4px',
                      alignSelf: 'center',
                      position: 'relative',
                    }}
                    label={
                      <Badge
                        bg='secondary'
                        style={{
                          position: 'absolute',
                          top: '-1rem',
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                      >
                        {renderClock()}
                      </Badge>
                    }
                  >
                    {children}
                  </ProgressBar>
                </div>
              )}
            />
          </Col>
        </Row>
        {/* Other Controls and Information */}
        <Row className='mb-10'>
          <div>
            <p>{fromDate}</p>
            <p>{fromTime}</p>
          </div>
          <Col className='d-flex align-items-center justify-content-center '>
            {/* Replay Icons */}
            <div className='d-flex align-items-center'>

            <DateTime
               fromDate={fromDate}
               setFromDate={setFromDate}
               toDate={toDate}
               setToDate={setToDate}
               fromTime={fromTime}
               setFromTime={setFromTime}
               toTime={toTime}
               setToTime={setToTime}
             />
              {/* Crop Icon */}
              <Button variant='plain' className='me-2 text-white fs-3' onClick={() => handleCrop()}>
                <Crop />
              </Button>

              {/* Replay Icons */}
              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleReplay(30)}
              >
                <ReplyAll />
              </Button>

              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleReplay(20)}
              >
                <Reply />
              </Button>

              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleReplay(10)}
              >
                <Rewind />
              </Button>

              {/* Play/Pause Icons */}
              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => {
                  if (hls && playerRef.current) {
                    isPlaying ? handlePause() : handlePlay()
                  } else {
                    console.log('HLS not available or player not initialized properly')
                  }
                }}
              >
                {isPlaying ? <PauseCircle /> : <PlayCircle />}
              </Button>

              {/* Fast Forward Icons */}
              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleFastForward(10)}
              >
                <FastForward />
              </Button>

              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleFastForward(20)}
              >
                <Reply style={{transform: 'scaleX(-1)'}} />
              </Button>

              <Button
                variant='plain'
                className='me-2 text-white fs-2'
                onClick={() => handleFastForward(30)}
              >
                <ReplyAll style={{transform: 'scaleX(-1)'}} />
              </Button>

              {/* Clock Icon */}
              <Button
                variant='plain'
                className='me-2 text-white fs-3'
                onClick={() => handleFastForward(30)}
              >
                <Clock />
              </Button>

              {/* Camera Icon */}
              <Button variant='plain' className='me-2 text-white fs-2' onClick={handleSnapshot}>
                <Camera />
              </Button>

              {/* Calendar Icon */}
              {/* <Button
                variant='plain'
                className='me-2 text-white fs-3'
                onClick={() => setShowPicker(true)}
              >
                <Calendar />
              </Button> */}
        
            </div>
          </Col>
        </Row>

        {/* Modal for Crop Video Options */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Crop Video Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Selected Range: {formatTime(startTime)} - {formatTime(endTime)}
            </p>
            <p>Range Duration: {formatTime(endTime - startTime)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' onClick={() => handleSave()}>
              Save
            </Button>
            <Button variant='success' onClick={() => shareVideo()}>
              Share
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Snapshot Modal */}
        <Modal show={isSnapshotModalOpen} onHide={() => setIsSnapshotModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Snapshot</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {snapshotDataUrl && (
              <img src={snapshotDataUrl} alt='Snapshot' style={{width: '100%'}} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleSaveSnapshot}>
              Save Snapshot
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* <Row className='mt-10'>
        <Col>
          <Form>
            <Form.Group className='mb-3 row'>
              <Form.Label className='col-sm-1 col-form-label'> Start Date</Form.Label> 
              <Col sm={3}>
                 <Form.Control
                  type='date'
                  placeholder='Enter date'
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                /> 
                <div className='controlled-picker'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker label=' Start Date and  Time' value={fromDate}  onChange={(e) => setFromDate(e.target.value)} />
                      </DemoContainer>
                    </LocalizationProvider>
                     <DateRangePicker format='dd MMM yyyy hh:mm:ss aa' showMeridian caretAs={FaCalendar} /> 
                </div>
              </Col>
            </Form.Group>
            <Form.Group className='mb-3 row'>
               <Form.Label className='col-sm-1 col-form-label'> End Date</Form.Label> 
              <Col sm={3}>
                 <Form.Control
                  type='date'
                  placeholder='Enter date'
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                /> 
                <div className='controlled-picker'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                      <DateTimePicker label=' End Date and  Time'  value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </DemoContainer>
                  </LocalizationProvider>
                     <DateRangePicker format='dd MMM yyyy hh:mm:ss aa' showMeridian caretAs={FaCalendar} /> 
                </div>
              </Col>
            </Form.Group>
             <Form.Group className='mb-3 row'>
              <Form.Label className='col-sm-1 col-form-label'>From Time</Form.Label>
              <Col sm={2}>
                <Form.Control
                  type='text'
                  placeholder='Enter time'
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className='mb-3 row'>
              <Form.Label className='col-sm-1 col-form-label'> To Time</Form.Label>
              <Col sm={2}>
                <Form.Control
                  type='text'
                  placeholder='Enter time'
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                />
              </Col>
            </Form.Group> 
          </Form>
        </Col>
      </Row> */}
      <Row>
        <Col>
          <Tooltip place='top' type='dark' effect='solid' />
        </Col>
      </Row>
    </>
  )
}

export default VideoEditor

export function DateTime({
  setFromDate,
  setToDate,
  setFromTime,
  setToTime,
}) {
  

  const handleDateChange = (dates) => {
    setFromDate(dates[0]?.toISOString() || '');
    setToDate(dates[1]?.toISOString() || '');
    setFromTime(dates[0]?.toISOString() || '');
    setToTime(dates[1]?.toISOString() || '');
  };

  const handleTimeChange = (times) => {
    setFromTime(times[0]?.toISOString() || '');
    setToTime(times[1]?.toISOString() || '');
    setFromDate(times[0]?.toISOString() || '');
    setToDate(times[1]?.toISOString() || '');
  };


  return (
    <div className='date-time-picker'>
      <Button variant='plain' className='me-2 text-white fs-3'>
        <Calendar />
        <span className='text-box-hide'>
          <DateRangePicker
            format='yyyy-MM-dd hh:mm '
            showMeridian
            caretAs={FaCalendar}
            onChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        </span>
      </Button>
    </div>
  );
}

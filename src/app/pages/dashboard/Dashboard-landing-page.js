// import {useState} from 'react'
// import React from 'react'
// import {PropTypes} from 'prop-types'
import { Link} from '@material-ui/core'
// import Chart from 'react-apexcharts'
//import {Button} from '@material-ui/core'
// import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import { useNavigate} from 'react-router-dom'
// import Live from './Livedata'

import Button from '@material-ui/core/Button'
// import SettingsPermission from '../permissions/PermissionPage'
// import RecordingPage from '../recording/RecordingPage'
import Table from 'react-bootstrap/Table'
// import InputGroup from 'react-bootstrap/InputGroup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'


export function DashboardLandingPage() {
  return (
    <div className='d-block'>
      <ViewlistItem />
      {/* <div className='my-20'>
        <CameraSettingpage />
      </div> */}
    </div>
  )
}



export function ViewlistItem() {
  const navigate = useNavigate()
  const username = 'admin';
  const password = 'admin123';

  const url = 'http://192.168.1.48:9996/get?path=camera1&start=2024-01-18T10%3A30%3A00%2B05%3A30&duration=60s&format=fmp4';

// Encode the credentials
const base64Credentials = btoa(`${username}:${password}`);

// Fetch the video using the Authorization header
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${base64Credentials}`,
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob();
  })
  .then(videoBlob => {
    const videoUrl = URL.createObjectURL(videoBlob);
    // Use the videoUrl to set the source of your video element
  })
  .catch(error => console.error('Error fetching video:', error));
  


  const handleCameraIconClick = () => {
    // Redirect to the recording page when the camera icon is clicked
    navigate('/recording')
  }

  return (
    <div className='d-block mt-10 camera-view-details'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='card '>
            <div className='card-header'>
              <div className='d-flex align-items-center justify-content-between'>
                <span className='name'> Camera name </span>
                <div className='date-details'>
                  <span className='date'> 10-11-2023 </span>
                  <span className='time'> 12:39 PM </span>
                </div>
              </div>
            </div>
            <div className='camera-body'>
            <video className='traffic-camera-00' width='100%' height='100%' autoPlay loop muted>
                <source
                  src={url}
                  type='video/fmp4'
                />
              </video>
              {/* <Live className='traffic-camera-00 md-3' autoPlay loop muted/> */}
              {/* Add onClick handler to the camera icon */}
            </div>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <div className='d-flex align-items-center justify-content-between'>
                <span className='name'> Camera name </span>
                <div className='date-details'>
                  <span className='date'> 10-11-2023 </span>
                  <span className='time'> 12:39 PM </span>
                </div>
              </div>
            </div>
            <div className='camera-body'>
              
              {/* <Live className='traffic-camera-00'  autoPlay loop muted/> */}
              
            </div>
          </div>
          
        </div>

        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <div className='d-flex align-items-center justify-content-between'>
                <span className='name'> Camera name </span>
                <div className='date-details'>
                  <span className='date'> 10-11-2023 </span>
                  <span className='time'> 12:39 PM </span>
                </div>
              </div>
            </div>
            <div className='camera-body'>
              {/* <Live className='traffic-camera-00' autoPlay loop muted/> */}
            
            </div>
          </div>
           
        </div>

        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <div className='d-flex align-items-center justify-content-between'>
                <span className='name'> Camera name </span>
                <div className='date-details'>
                  <span className='date'> 10-11-2023 </span>
                  <span className='time'> 12:39 PM </span>
                </div>
              </div>
            </div>
            <div className='camera-body'>
              {/* <Live className='traffic-camera-00' autoPlay loop muted/> */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

// export function CameraSettingpage() {
//   return (
//     <div className='camera-setting-tab'>
//       <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
//         <li className='nav-item'>
//           {/* <Link className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
//           General 
//           </Link> */}

//           <Link className='nav-link active' data-bs-toggle='tab' href='#general'>
//             General
//           </Link>
//         </li>
//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#connection'>
//             Connection
//           </Link>
//         </li>
//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#video-feeds'>
//             Video Feeds
//           </Link>
//         </li>

//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#input-output'>
//             Input/Output
//           </Link>
//         </li>
//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#edge'>
//             Edge
//           </Link>
//         </li>

//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#pts'>
//             PTS
//           </Link>
//         </li>
//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#prevents'>
//             Prevents
//           </Link>
//         </li>

//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#access'>
//             Access
//           </Link>
//         </li>
//         <li className='nav-item'>
//           <Link className='nav-link' data-bs-toggle='tab' href='#privacy-zones'>
//             Privacy Zones
//           </Link>
//         </li>
//       </ul>
//       <div className='tab-content' id='myTabContent'>
//         <div className='tab-pane fade active show' id='general' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/fmp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-5'>
//               <div className='camera-connection-details ps-5'>
//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>Camera Name</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <input className='search' type='text' />
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>Camera URL</div>
//                   <div className='search-name flex-grow-1 mt-2 ms-3 w-60'>
//                     <Link className='camera-link' href='http://192.168.1.61'>
//                       http://192.168.1.61
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         <div className='tab-pane fade' id='connection' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-5'>
//               <div className='camera-connection-details ps-5'>
//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>Driver</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>ONVIF V2</option>
//                       <option value='1'>ONVIF V4</option>
//                       <option value='2'>ONVIF V6</option>
//                       <option value='3'>ONVIF V8</option>
//                     </Form.Select>
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-4 mt-2'>
//                   <div className='camera-name flex-shrink-0 w-40'>IP address</div>
//                   <div className='search-name flex-grow-1 mt-2 ms-3 w-60'>
//                     <input className='search' type='text' value='192.168.1.61' />
//                   </div>
//                 </div>
//                 <div className='d-flex align-items-center my-4'>
//                   <div className='camera-name flex-shrink-0 w-40'>Video input</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>1</option>
//                       <option value='1'>2</option>
//                       <option value='2'>3</option>
//                       <option value='3'>4</option>
//                     </Form.Select>
//                   </div>
//                 </div>
//                 <div className='d-flex align-items-center my-4'>
//                   <div className='camera-name flex-shrink-0 w-40'>Port</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>Default</option>
//                       <option value='1'>Default 2</option>
//                       <option value='2'>Default 3</option>
//                       <option value='3'> Default 4</option>
//                     </Form.Select>
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-4'>
//                   <div className='camera-name flex-shrink-0 w-40'>Login</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <input className='search' type='text' value='admin' />
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-4'>
//                   <div className='camera-name flex-shrink-0 w-40'>Password</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <input className='search' type='password' value='admin' />
//                   </div>
//                 </div>
//                 <div className='submit-button mt-4'>
//                   <Button size='small' variant='outlined' className='btn success'>
//                     Apply
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-3'></div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         <div className='tab-pane fade' id='video-feeds' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-8'>
//               <div className='video-feedsTab'>
//                 <div className='video-feeds-table'>
//                   <Table>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Format</th>
//                         <th>Resolution</th>
//                         <th>Live</th>
//                         <th>Rec. channel</th>
//                         {/* <th>Video analytics</th> */}
//                         <td colSpan={5}>Video analytics</td>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>01</td>
//                         <td>H264</td>
//                         <td>1280*720 (16:9)</td>
//                         <td>Yes </td>
//                         <td>#1 (default)</td>
//                         <td></td>
//                         <td>1280*720 (16:9)</td>
//                         <td>Yes </td>
//                         <td>#1 (default)</td>
//                         <td></td>
//                       </tr>
//                       <tr>
//                         <td>02</td>
//                         {/* <td colSpan={2}>Unused (unicast)</td> */}
//                         <td colSpan={8}>Unused (unicast)</td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                   <div className='d-block video-recording-details mt-2'>
//                     <div className='d-flex align-items-center my-4'>
//                       <div className='camera-name flex-shrink-0 w-40'>Live</div>
//                       <div className='video-summary01 flex-grow-1 ms-3 w-60'>
//                         Live viewing is enabled on 1 of the feeds
//                       </div>
//                     </div>

//                     <div className='d-flex align-items-center my-4'>
//                       <div className='camera-name flex-shrink-0 w-40'>Recording</div>
//                       <div className='video-summary01 flex-grow-1 ms-3 w-60'>
//                         Recording is enabled on 1 of the feeds
//                       </div>
//                     </div>

//                     <div className='d-flex align-items-center my-4'>
//                       <div className='camera-name flex-shrink-0 w-40'>Video analytics</div>
//                       <div className='video-summary01 flex-grow-1 ms-3 w-60'>
//                         No video analytics feeds are enabled
//                       </div>
//                     </div>

//                     <div className='video-summary-control'>
//                       <div className='d-flex align-items-center justify-content-end'>
//                         <Button className='btn edit'>Edit</Button>
//                         <Button className='btn ms-4 clear'>Clear</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='feed-format-details'>
//                   <div className='d-flex  feed-format-content'>
//                     <div className='block'>
//                       <div className='title'>Feeds</div>
//                       <span className='format-content'>format</span>
//                       <span className='format-content'>-</span>
//                       <span className='format-content'>Recordings</span>
//                       <span className='format-content'>-</span>
//                       <span className='format-content'>Framerate</span>
//                       <span className='format-content'>-</span>
//                     </div>
//                     <div className='format-advance-optional'>
//                       <Link className='btn'>Advance</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className='card-footer mt-4'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className='tab-pane fade' id='input-output' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-8'>
//               <div className='video-output-controller'>
//                 <div className='video-output-details'>
//                   <div className='title mb-3'>Inputs</div>
//                   <div className='row'>
//                     <div className='col-md-10'>
//                       <div className='video-output-table'>
//                         <Table>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Name</th>
//                               <th>State</th>
//                               <th>Enabled</th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td>01</td>
//                               <td>Inputs 1</td>
//                               <td>Unknown</td>
//                               <td colSpan={15}>
//                                 <span className='d-flex align-items-center gap-2  '>
//                                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                                 </span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td>02</td>
//                               <td>Inputs 1</td>
//                               <td>Unknown</td>
//                               <td colSpan={15}>
//                                 <span className='d-flex align-items-center gap-2  '>
//                                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                                 </span>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </Table>
//                       </div>
//                     </div>
//                     <div className='col-md-2'>
//                       <div className='input-btn-list'>
//                         <Button className='btn'>Enable</Button>
//                         <Button className='btn'>Edit</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='video-output-details mt-8'>
//                   <div className='title mb-3'>Outputs</div>
//                   <div className='row'>
//                     <div className='col-md-10'>
//                       <div className='video-output-table'>
//                         <Table>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Name</th>
//                               <th>State</th>
//                               <th>Enabled</th>
//                               <th>Pulse duration</th>
//                               <th>Pulse only</th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                               <th></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td>01</td>
//                               <td>Outputs 1</td>
//                               <td>Unknown</td>
//                               <td colSpan={15}>
//                                 <span className='d-flex align-items-center gap-2  '>
//                                   <img
//                                     className='close-icon'
//                                     src='media/surveillances/close.svg'
//                                     alt='icon'
//                                   />
//                                 </span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td>02</td>
//                               <td>Outputs 1</td>
//                               <td>Unknown</td>
//                               <td colSpan={15}>
//                                 <span className='d-flex align-items-center gap-2  '>
//                                   <img
//                                     className='close-icon'
//                                     src='media/surveillances/close.svg'
//                                     alt='icon'
//                                   />
//                                 </span>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </Table>
//                       </div>
//                     </div>
//                     <div className='col-md-2'>
//                       <div className='input-btn-list'>
//                         <Button className='btn'>Enable</Button>
//                         <Button className='btn'>Edit</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='video-output-details mt-8'>
//                   <div className='row'>
//                     <div className='col-md-10'>
//                       <div className='row'>
//                         <div className='col-md-5'>
//                           <div className='title mb-3'>Triggers history</div>
//                           <div className='video-output-table'>
//                             <FloatingLabel controlId='floatingTextarea2' label='Message'>
//                               <Form.Control
//                                 as='textarea'
//                                 placeholder='Leave a Message here'
//                                 style={{height: '190px'}}
//                               />
//                             </FloatingLabel>
//                           </div>
//                         </div>
//                         <div className='col-md-7'>
//                           <div className='title mb-3'>Triggers</div>
//                           <div className='video-output-table'>
//                             <Table>
//                               <thead>
//                                 <tr>
//                                   <th>#</th>
//                                   <th>Name</th>
//                                   <th>State</th>
//                                   <th>Enabled</th>
//                                   <th>Message</th>
                               
//                                 </tr>
//                               </thead>
//                               <tbody style={{height: '68px'}}>
//                                 <tr>
//                                   <td>01</td>
//                                   <td></td>
//                                   <td>Unknown</td>
//                                   <td colSpan={15}>
                                  
                                   
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                 <td></td>
//                                 <td></td>
//                                 <td></td>
//                                 <td></td>
//                                 </tr>
//                               </tbody>
//                             </Table>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='col-md-2'>
//                       <div className='input-btn-list mt-4'>
//                         <Button className='btn'>Enable</Button>
//                         <Button className='btn'>Edit</Button>
//                         <Button className='btn' style={{color:"rgba(30, 30, 30, 1)"}}>New</Button>
//                         <Button className='btn'>Delete</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className='tab-pane fade' id='edge' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-5'>
//               <div className='camera-connection-details ps-5'>
//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>Enable edge review</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>No</option>
//                       <option value='1'>Yes</option>
//                     </Form.Select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-3'></div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className='tab-pane fade' id='pts' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-5'>
//               <div className='camera-connection-details ps-5'>
//                 <div className='enable-btn d-flex align-items-center my-4'>
//                   <input className='enable-btn-checkbox' type='checkbox' id='Enable-PTZ' />
//                   <label for='Enable-PTZ' className='ms-2'>
//                     Enable PTZ
//                   </label>
//                 </div>

//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>PTZ channel</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>Onboard</option>
//                       <option value='1'>Onboard V4</option>
//                       <option value='2'>Onboard V6</option>
//                       <option value='3'>Onboard V8</option>
//                     </Form.Select>
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-3'>
//                   <div className='camera-name flex-shrink-0 w-40'>Preset name</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>Preset 1 </option>
//                       <option value='1'>Preset 2 </option>
//                       <option value='2'>Preset 3 </option>
//                       <option value='3'>Preset 4 </option>
//                     </Form.Select>
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-3'>
//                   <div className='camera-name flex-shrink-0 w-40'>Zoom speed</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>User defined</option>
//                       <option value='1'>User defined 2</option>
//                       <option value='2'>User defined V6</option>
//                       <option value='3'>User defined V8</option>
//                     </Form.Select>
//                   </div>
//                 </div>

//                 <div className='d-flex align-items-center my-3'>
//                   <div className='camera-name flex-shrink-0 w-40'>Home position</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>Select home preset</option>
//                       <option value='1'> home preset V4</option>
//                       <option value='2'> home preset V6</option>
//                       <option value='3'> home preset V8</option>
//                     </Form.Select>
//                   </div>
//                 </div>
//                 <div className='enable-btn d-flex align-items-center my-4'>
//                   <input className='enable-btn-checkbox' type='checkbox' id='Switch-wash' />
//                   <label for='Switch-wash' className='ms-2'>
//                     Switch wash/wipe relays
//                   </label>
//                 </div>

//                 <div className='enable-btn d-flex align-items-center my-4'>
//                   <input className='enable-btn-checkbox' type='checkbox' id='Reverse' />
//                   <label for='Reverse' className='ms-2'>
//                     Reverse pan direction
//                   </label>
//                 </div>

//                 <div className='enable-btn d-flex align-items-center my-4'>
//                   <input className='enable-btn-checkbox' type='checkbox' id='direction' />
//                   <label for='direction' className='ms-2'>
//                     Reverse tilt direction
//                   </label>
//                 </div>

//                 <div className='submit-button mt-4'>
//                   <Button size='small' variant='outlined' className='btn success'>
//                     Configure PTZ tours
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-3'></div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className='tab-pane fade' id='prevents' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-5'>
//               <div className='camera-connection-details ps-5'>
//                 <div className='d-flex align-items-center my-1'>
//                   <div className='camera-name flex-shrink-0 w-40'>Frame rate</div>
//                   <div className='search-name flex-grow-1 ms-3 w-60'>
//                     <Form.Select aria-label='Default select example' size='sm'>
//                       <option>Frame rate of 24fps</option>
//                       <option value='1'>Frame rate of 44fps</option>
//                       <option value='2'>Frame rate of 64fps</option>
//                       <option value='3'>Frame rate of 84fps</option>
//                     </Form.Select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-3'></div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className='tab-pane fade' id='access' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-8'>
//               <div className='conditional-access'>
//                 <Table>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Live</th>
//                       <th>Review</th>
//                       <th>PTZ</th>
//                       <th>PTZ Menu</th>
//                       <th>Set presets</th>
//                       <th>Audio listen</th>
//                       <th>Hide privacy zones</th>
//                       <th>Audi call</th>
//                       <th>Set all </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Level 1</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 2</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Level 3</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 4</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 5</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 6</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 7</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 8</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 9</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 10</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 11</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 12</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 13</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 14</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>Level 15</td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center text-center'>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                         </span>
//                       </td>

//                       <td>
//                         <span className='d-flex align-items-center gap-2 justify-content-center '>
//                           <img src='media/surveillances/check-mark.svg' alt='icon' />
//                           <img
//                             className='close-icon'
//                             src='media/surveillances/close.svg'
//                             alt='icon'
//                           />
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='tab-pane fade' id='privacy-zones' role='tabpanel'>
//           <div className='row'>
//             <div className='col-md-4 border-right'>
//               <div className='camera-information'>
//                 <div className='card'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                   <div className='card-body'>
//                     <div className='d-block my-2'>
//                       <Form.Select aria-label='Default select example' size='sm'>
//                         <option>H264 1280*720 2.10 Mbps</option>
//                         <option value='1'>H264 1200*720 1.10 Mbps</option>
//                         <option value='2'>H264 1280*720 2.10 Mbps</option>
//                         <option value='3'>H264 1280*720 3.10 Mbps</option>
//                       </Form.Select>
//                     </div>

//                     <div className='camera-ip-details'>
//                       <div className='sub-title'>Camera Information </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Driver </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> ONVIF V2 </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>IP address</span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> 192.168.1.61 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span> Model </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span> SIP-CD201 </span>
//                         </div>
//                       </div>

//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Serial number </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>Y2121A254Z </span>
//                         </div>
//                       </div>
//                       <div className='d-flex align-items-center my-1'>
//                         <div className='flex-shrink-0 w-50'>
//                           <span>Firmware </span>
//                         </div>
//                         <div className='flex-grow-1 ms-3 50'>
//                           <span className='me-2'> : </span> <span>7.3.3.970 Apr 202500.. </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-8'>
//               <div className='privacy-zones'>
//                 <div className='privacy-zones-video'>
//                   <div className='camera-view'>
//                     <video
//                       className='traffic-camera-00'
//                       width='100%'
//                       height='100%'
//                       autoPlay
//                       loop
//                       muted
//                     >
//                       <source
//                         src={process.env.PUBLIC_URL + '/media/video/videoplayback.mp4'}
//                         type='video/mp4'
//                       />
//                     </video>
//                   </div>
//                 </div>
//                 <div className='zone-btns d-flex gap-6 align-items-center mt-4'>
//                   <Button className='btn'>Add Zone</Button>
//                   <Button className='btn'>Clear all zone</Button>
//                   <Button className='btn'>Clear selected zone</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className='card-footer'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className='d-flex align-items-center'>
//                 <Link className='ms-1 pointer'>
//                   <img src='media/surveillances/check-mark.svg' alt='icon' />
//                 </Link>
//                 <span className='ms-2 mt-1'> Connected to camera</span>
//               </div>

//               <div className='submit-button'>
//                 <Button variant='outlined' className='btn success'>
//                   OK
//                 </Button>

//                 <Button variant='outlined' className='btn ms-2 cancel'>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//       <div className='card-footer mt-6'>
//         <div className='d-flex align-items-center justify-content-between'>
//           <div className='d-flex align-items-center'>
//             <Link className='ms-1 pointer'>
//               <img src='media/surveillances/check-mark.svg' alt='icon' />
//             </Link>
//             <span className='ms-2 mt-1'> Connected to camera</span>
//           </div>

//           <div className='submit-button'>
//             <Button variant='outlined' className='btn success'>
//               OK
//             </Button>

//             <Button variant='outlined' className='btn ms-2 cancel'>
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

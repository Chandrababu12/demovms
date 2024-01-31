// DynamicTable.js

import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import axios from 'axios';
import './style.css';
// import CameraList from './CameraList';
// import LayoutList from './Layoutlist';
// import SavedLayout from './SavedLayout'
import TablemergeComponent from './mergecell'

const DynamicTable = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableSize, setTableSize] = useState({ width: 100, height: 100 });
  const [mergeOption, setMergeOption] = useState('');
  const [cellVideos, setCellVideos] = useState(Array(rows * cols).fill(null));
  const [selectedIcon, setSelectedIcon] = useState('3x3');
  const [isTableGenerated, setIsTableGenerated] = useState(false);
  const [matrixValue, setMatrixValue] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [currentLayout, setCurrentLayout] = useState({
    rows: 1,
    cols: 1,
    mergeOption: null,
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const updateTableSize = () => {
      setTableSize({
        width: window.innerWidth - 360,
        height: window.innerHeight - 100,
      });
    };

    updateTableSize();

    window.addEventListener('resize', updateTableSize);

    return () => {
      window.removeEventListener('resize', updateTableSize);
    };
  }, []);

  useEffect(() => {
    // Update current layout information when rows, cols, or mergeOption change
    setCurrentLayout({
      rows,
      cols,
      mergeOption,
    });
  }, [rows, cols, mergeOption]);

  useEffect(() => {
    // Update rows and cols based on the selected icon
    if (selectedIcon === '1x1') {
      setRows(1);
      setCols(1);
    } else if (selectedIcon === '2x2') {
      setRows(2);
      setCols(2);
    } else {
      const [selectedRows, selectedCols] = selectedIcon.split('x').map(Number);
      setRows(selectedRows);
      setCols(selectedCols);
    }
  }, [selectedIcon]);
  const handleIconClick = (rows, cols, icon) => {
    setRows(rows);
    setCols(cols);
    setIsTableGenerated(false);
    setSelectedIcon(icon);
    setMergeOption(null);
  };
  const handleIconClick1x1 = () => handleIconClick(1, 1, '1x1');
  const handleIconClick2x2 = () => handleIconClick(2, 2, '2x2');
  const handleIconClick3x3 = () => handleIconClick(3, 3, '3x3');
  const handleIconClick4x4 = () => handleIconClick(4, 4, '4x4');
  const handleIconClick5x5 = () => handleIconClick(5, 5, '5x5');
  const handleIconClick6x6 = () => handleIconClick(6, 6, '6x6');
  const handleIconClick7x7 = () => handleIconClick(7, 7, '7x7');
  const handleIconClick8x8 = () => handleIconClick(8, 8, '8x8');
  const handleIconClick9x9 = () => handleIconClick(9, 9, '9x9');

  
  const handleMergeOptionChange = (event) => {
    setMergeOption(event.target.value || null);
  };
  useEffect(() => {
    console.log(mergeOption);
  }, [mergeOption]);
  const handleSaveLayout = () => {
    const totalCells = rows * cols;
  
    // Check if all cells are filled with videos
    const allCellsFilled = cellVideos.filter(video => video !== null).length === totalCells;
  
    if (allCellsFilled) {
      setIsFormOpen(true); // Open the form
    } else {
      setIsFormOpen(false);
      alert("Please fill all cells with videos before saving.");
      // You can add additional handling/logic here if needed
    }
  };
  
  
  const handleFormSubmit = async () =>  {
    setIsFormOpen(false);
    if (!layoutName) {
      console.error('Layout name is required.');
      return;
    }
    if (cellVideos.some(url => url === null)) {
      alert('Device URLs cannot contain null values. Please fill the layout.');
      return;
    }
    try {
      const { rows, cols, mergeOption } = currentLayout;
      const deviceUrls = cellVideos.filter(url => url !== null);
    
      const variables = {
        created_by: 'your_user_id',
        deleted_by: null,
        modified_by: null,
        name: layoutName, // Use the user-provided name
        position: mergeOption || '', // Use mergeOption as position
        type: `${rows}x${cols}`,  // You can set deleted_by if needed
        device_urls: deviceUrls,
      };
  
      // Set up the headers for authorization
      const headers = {
        'Content-Type': 'application/json',
        'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY, // Replace with your actual Hasura access key
      };
  
      // Make the GraphQL mutation request
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: `
            mutation InsertSavedLayout($name: String, $type: String, $position: String,$created_by: String, $modified_by: String, $deleted_by: String,  $device_urls: [String!]) {
              insert_saved_layout(objects: {name: $name, type: $type, position: $position, created_by: $created_by, modified_by: $modified_by, deleted_by: $deleted_by,  device_urls: $device_urls}) {
                affected_rows
                returning {
                  id
                  name
                  type
                  position
                  created_by
                  created_at
                  modified_by
                  modified_at
                  deleted_by
                  deleted_at
                  deleted
                  device_urls
                }
              }
            }
          `,
          variables,
        },
        { headers }
      );
  
      // Check for GraphQL errors in the response
      if (response.data.errors) {
        throw new Error(response.data.errors.map(error => error.message).join(', '));
      }
  
      // Handle success or update state as needed
      console.log('Layout saved successfully:', response.data.data.insert_saved_layout.returning[0]);
    } catch (error) {
      // Handle errors
      console.error('Error saving layout:', error.message);
    }
  };
  
  
  const handleDragStartCell = (event, cellIndex) => {
    const file = cellVideos[cellIndex];
    if (file) {
      event.dataTransfer.setData('text', file);
    }
  };
  const handleCellDrop = async (event, cellIndex) => {
    event.preventDefault();

    // Retrieve the device data from the drag event
    const deviceDataString = event.dataTransfer.getData('text/plain');
    const { deviceName, ipAddress } = JSON.parse(deviceDataString);

    // Send a POST request to the specified API endpoint
    try {
      // Construct the cameras array with the dropped camera data
      const cameras = [
        { camera_name: deviceName, ip: ipAddress },
      ];

      // Send the POST request and capture the response
      const response = await axios.post('http://192.168.1.56:5001/start_recording_for', { cameras });

      // Handle success or update state as needed
      console.log('Recording started successfully!');

      // Find the matching device by name
      const outputUrl = response.data.cameras[0].output_url;

      // Update the state with the output URL
      const updatedCellVideos = [...cellVideos];
      updatedCellVideos[cellIndex] = outputUrl;
      console.log(updatedCellVideos);
      setCellVideos(prevCellVideos => {
        const updatedVideos = [...prevCellVideos];
        updatedVideos[cellIndex] = outputUrl;
        return updatedVideos;
      });
      const updatedCurrentLayout = {
        ...currentLayout,
        device_urls: updatedCellVideos.filter(url => url !== null),
      };
      setCurrentLayout(updatedCurrentLayout);
      console.log('Output URL:', outputUrl);
    } catch (error) {
      // Handle errors
      console.error('Error starting recording:', error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event, deviceName, ipAddress) => {
    // Start dragging the device name and IP address
    event.dataTransfer.setData('text/plain', JSON.stringify({ deviceName, ipAddress }));
  };

  const handleDragLeaveCell = (event, cellIndex) => {
    // Handle drag leave if needed
  };

  return (
    <div className="container">
       {/* <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <CameraList onDragStart={(event, deviceName, ipAddress) => handleDragStart(event, deviceName, ipAddress)} />
      </div>  */}

      <div className="content">
        <div className="header">
          <div className="toggle-icon" onClick={toggleSidebarVisibility}>
            {/* {sidebarVisible ? <BsTextIndentLeft /> : <BsTextIndentRight />} */}
          </div>
          {/*  */}
      <div className="icon-container">
      <div className="matrix-icons">
      <img src="media/surveillances/1_1.svg" alt='' className="matrix-icon" onClick={handleIconClick1x1} />
      <img src="media/surveillances/2_2.svg" alt='' className="matrix-icon" onClick={handleIconClick2x2} />
      <img src="media/surveillances/3_3.svg" className="matrix-icon" onClick={handleIconClick3x3} />
      </div>

      <div className="matrix-icon" style={{marginTop:'0px', fontSize:'1.5em'}} onClick={handleDropdownToggle}>
        {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      {isDropdownOpen && (
       <div className="dropdown-icons">
       <div style={{display:'block',position:'relative'}}>
       <img src="media/surveillances/4_4.svg" alt='' className="matrix-value" onClick={handleIconClick4x4}/>
       <img src="media/surveillances/5_5.svg" alt='' className="matrix-value" onClick={handleIconClick5x5}/>
       <img src="media/surveillances/6_6.svg" alt='' className="matrix-value" onClick={handleIconClick6x6}/>
       </div>
       <br/>
       <div style={{display:'block'}}>
       <img src="media/surveillances/7_7.svg" alt='' className="matrix-value2" onClick={handleIconClick7x7}/>
       <img src="media/surveillances/8_8.svg" alt='' className="matrix-value2" onClick={handleIconClick8x8}/>
       <img src="media/surveillances/9_9.svg" alt='' className="matrix-value2" onClick={handleIconClick9x9}/>
      </div>
          <div style={{display:'block'}}>
          <img src="media/surveillances/Vector.svg" alt='' className="matris-icon"  style={{ transform: 'rotate(270deg)' }} onClick={() => handleMergeOptionChange({ target: { value: 'topLeft' } })} />
          <img src="media/surveillances/Vector.svg" alt='' className="matris-icon"  style={{ transform: 'rotate(360deg)' }} onClick={() => handleMergeOptionChange({ target: { value: 'topRight' } })} />
          <img src="media/surveillances/Vector.svg" alt='' className="matris-icon"  style={{ transform: 'rotate(180deg)' }} onClick={() => handleMergeOptionChange({ target: { value: 'bottomLeft' } })} />
          <img src="media/surveillances/Vector.svg" alt='' className="matris-icon"  style={{ transform: 'rotate(90deg)' }} onClick={() => handleMergeOptionChange({ target: { value: 'bottomRight' } })} />
          </div>
          {/* Add more icons or content as needed */}
          </div>
      )}
      </div>
      </div>
        <div className="table-container">
        <div className="table-and-layout">
        {/* Render the TableComponent and pass necessary props */}
        {mergeOption ? (
  <TablemergeComponent
    tableSize={tableSize}
    rows={4}
    cols={4}
    cellVideos={cellVideos}
    mergeOption={mergeOption}
    isTableGenerated={isTableGenerated}
    setIsTableGenerated={setIsTableGenerated}
    handleCellDrop={handleCellDrop}
    handleDragOver={handleDragOver}
    handleDragStartCell={handleDragStartCell}
    handleDragLeaveCell={handleDragLeaveCell}
  />
) : (
  <TablemergeComponent
    tableSize={tableSize}
    rows={rows}
    cols={cols}
    cellVideos={cellVideos}
    isTableGenerated={isTableGenerated}
    setIsTableGenerated={setIsTableGenerated}
    handleCellDrop={handleCellDrop}
    handleDragOver={handleDragOver}
    handleDragStartCell={handleDragStartCell}
    handleDragLeaveCell={handleDragLeaveCell}
    mergeOption={null} 
  />
)}

      </div>
      </div>
      </div>
      <div className="form-overlay" style={{ display: isFormOpen ? 'flex' : 'none' }}>
        <div className="form-container">
          <label htmlFor="layoutName">Layout Name:</label>
          <input
            type="text"
            id="layoutName"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
          <button onClick={handleFormSubmit}>Save Layout</button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;

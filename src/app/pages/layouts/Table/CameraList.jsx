// CameraList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CameraList = ({ onDragStart }) => {
  const [deviceData, setDeviceData] = useState([]);
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: GraphQLQueries.GET_DEVICE_QUERY,
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          }
        );
        setDeviceData(response.data.data.device);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchDeviceData();
  }, [hasuraAccessKey]);

  return (
    <div className="sidebar">
      <h2>Camera Files</h2>
      <ul>
        {deviceData.map((device, index) => (
          <li
            key={index}
            draggable
            onDragStart={(event) => onDragStart(event, device.name, device.ip_address)}
          >
            {device.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraList;

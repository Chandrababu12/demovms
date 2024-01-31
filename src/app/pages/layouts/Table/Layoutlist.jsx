import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedTableComponent from './SavedLayout';
import './style.css';

const LayoutList = () => {
  const [layoutList, setLayoutList] = useState([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

  useEffect(() => {
    fetchLayoutList();

    // Fetch layout list every 2 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLayoutList, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchLayoutList = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-hasura-access-key': hasuraAccessKey,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: `
            query GetSavedLayout {
              saved_layout {
                device_urls
                deleted
                id
                created_by
                deleted_by
                modified_by
                name
                position
                type
                created_at
                deleted_at
                modified_at
              }
            }
          `,
        },
        { headers }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors.map((error) => error.message).join(', '));
      }

      setLayoutList(response.data.data.saved_layout);
    } catch (error) {
      console.error('Error fetching layout list:', error.message);
    }
  };

  const handleLayoutChange = (event) => {
    const layoutId = event.target.value;
    setSelectedLayoutId(layoutId);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedLayoutId(null);
  };

  const getRowsAndColumns = (type) => {
    const [rows, columns] = type.split('x').map(Number);
    return { rows, columns };
  };

  return (
    <div>
      <select onChange={handleLayoutChange} value={selectedLayoutId || ''}>
        <option value="" disabled>
          Saved Layout
        </option>
        {layoutList.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.name}
          </option>
        ))}
      </select>
      {isPopupVisible && selectedLayoutId && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>{layoutList.find((layout) => layout.id === parseInt(selectedLayoutId)).name}</p>
            <SavedTableComponent
              tableSize={{ width: 1000, height: 100 }}
              rows={getRowsAndColumns(layoutList.find((layout) => layout.id === parseInt(selectedLayoutId)).type).rows}
              cols={getRowsAndColumns(layoutList.find((layout) => layout.id === parseInt(selectedLayoutId)).type).columns}
              position={layoutList.find((layout) => layout.id === parseInt(selectedLayoutId)).position}
              cellVideos={layoutList.find((layout) => layout.id === parseInt(selectedLayoutId)).device_urls}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutList;

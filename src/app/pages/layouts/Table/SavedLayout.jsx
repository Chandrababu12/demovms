import React from 'react';
import VideoPlayer from './videoplayer';

const SavedTableComponent = ({
  tableSize,
  rows,
  cols,
  position,
  cellVideos,
}) => {
  const createTable = () => {
    const table = [];
    const cellSize = Math.min(tableSize.width / cols, tableSize.height / rows);
    const cellStyle = {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
    };

    let cellHeight = tableSize.height / rows;

    if (rows === 1 && cols === 4) {
      cellHeight = tableSize.height / 12;
    }

    const cellWidth = tableSize.width / cols;

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        const cellIndex = i * cols + j;

        // Check the position to determine cell rendering logic
        if (
          (position === 'topLeft' && i < 3 && j < 3) ||
          (position === 'topRight' && i < 3 && j >= cols - 3) ||
          (position === 'bottomRight' && i >= rows - 3 && j >= cols - 3) ||
          (position === 'bottomLeft' && i >= rows - 3 && j < 3)
        ) {
          // Render merged cells based on position
          if (i === 0 && j === 0 && position === 'topLeft') {
            row.push(
              <td
                key={`${i}-${j}`}
                colSpan={3}
                rowSpan={3}
                style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                
              >
                {cellVideos[cellIndex] && (
                  <div style={{ width: '100%', height: '100%' }} >
                    <VideoPlayer source={cellVideos[cellIndex]} style={{ width: 'auto', height: 'auto', objectFit: 'contain' }} />
                  </div>
                )}
              </td>
            );
          } else if (i === 0 && j === cols - 3 && position === 'topRight') {
            row.push(
                <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                >
                   {cellVideos[cellIndex] && (
                  <div style={{ width: '100%', height: '100%' }} >
                    
                    <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                  </div>
                )}
                </td>
              );
          } else if (i === rows - 3 && j === cols - 3 && position === 'bottomRight') {
            row.push(
                <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                >
                   {cellVideos[cellIndex] && (
                  <div style={{ width: '100%', height: '100%' }} >
                    <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                  </div>
                )}
                </td>
              );
          } else if (i === rows - 3 && j === 0 && position === 'bottomLeft') {
            row.push(
                <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                >
                   {cellVideos[cellIndex] && (
                  <div style={{ width: '100%', height: '100%' }} >
                    
                    <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                  </div>
                )}
                </td>
              );
          } else if (j >= 3 && cellVideos[cellIndex] === null) {
            continue; // Skip regular cells within the merged area
          }
        } else {
          // Render regular cells
          row.push(
            <td
              key={`${i}-${j}`}
              style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
            >
              {cellVideos[cellIndex] && (
                <div style={{ width: '100%', height: '100%' }} >
                  <VideoPlayer source={cellVideos[cellIndex]} style={{ width: 'auto', height: 'auto', objectFit: 'contain' }} />
                </div>
              )}
            </td>
          );
        }
      }
      table.push(<tr key={i}>{row}</tr>);
    }

  
    return table;
  };

  return (
    <table style={{ width: `${tableSize.width}px`, height: `${tableSize.height}px`, margin: 0 }}>
      <tbody>{createTable()}</tbody>
    </table>
  );
};

export default SavedTableComponent;

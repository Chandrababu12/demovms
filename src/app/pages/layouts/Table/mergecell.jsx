import React from 'react';
import VideoPlayer from './videoplayer'; 
import './style.css'
const TablemergeComponent = ({
  tableSize,
  rows,
  cols,
  cellVideos,
  mergeOption,
  isTableGenerated,
  setIsTableGenerated,
  handleCellDrop,
  handleDragOver,
  handleDragLeaveCell,
}) => {
    const createTable = () => {
        const table = [];
        const cellSize = Math.min(tableSize.width / cols, tableSize.height / rows);
        const cellStyle = {
          width: `${cellSize}px`,
          height: `${cellSize}px`,
        };
        const handleDragStartCell = (event, cellIndex) => {
          const file = cellVideos[cellIndex];
          if (file) {
            event.dataTransfer.setData('text', file);
          }
        };
    
        let cellHeight = tableSize.height / rows; // Calculate initial cell height
    
        const cellWidth = tableSize.width / cols;
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            const cellIndex = i * cols + j;
    
            if (mergeOption === 'topLeft' && i < 3 && j < 3 &&(rows === 4 ) && cols === rows) {
              // Render a merged cell in the top-left corner for the first 3x3 cells
              if (i === 0 && j === 0) {
                row.push(
                  <td
                    key={`${i}-${j}`}
                    colSpan={3}
                    rowSpan={3}
                    style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                    onDrop={(event) => handleCellDrop(event, cellIndex)}
                    onDragOver={(event) => handleDragOver(event)}
                    onDragLeave={(event) => handleDragLeaveCell(event, cellIndex)}
                  >
                    {cellVideos[cellIndex] && (
                    <div style={{ width: '100%', height: '100%' }}
                    draggable
                    onDragStart={(event) => handleDragStartCell(event, cellIndex)}>
                      <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                    </div>
                  )}
                  </td>
                );
              }
            } else if (mergeOption === 'topRight' && i < 3 && j >= cols - 3&&(rows === 4) && cols === rows) {
              // Render a merged cell in the top-right corner for the first 3x3 cells
              if (i === 0 && j === cols - 3) {
                row.push(
                  <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                  onDrop={(event) => handleCellDrop(event, cellIndex)}
                  onDragOver={(event) => handleDragOver(event)}
                  onDragLeave={(event) => handleDragLeaveCell(event, cellIndex)}
                  >
                    {cellVideos[cellIndex] && (
                    <div style={{ width: '100%', height: '100%' }} draggable
                    onDragStart={(event) => handleDragStartCell(event, cellIndex)}>
                      <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                    </div>
                  )}
                  </td>
                );
              }
            } else if (mergeOption === 'bottomRight' && i >= rows - 3 && j >= cols - 3&&(rows === 4) && cols === rows) {
              // Render a merged cell in the bottom-right corner for the last 3x3 cells
              if (i === rows - 3 && j === cols - 3) {
                row.push(
                  <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                  onDrop={(event) => handleCellDrop(event, cellIndex)}
                  onDragOver={(event) => handleDragOver(event)}
                  onDragLeave={(event) => handleDragLeaveCell(event, cellIndex)}
                  >
                    {cellVideos[cellIndex] && (
                    <div style={{ width: '100%', height: '100%' }} draggable
                    onDragStart={(event) => handleDragStartCell(event, cellIndex)}>
                      <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                    </div>
                  )}
                  </td>
                );
              }
            } else if (mergeOption === 'bottomLeft' && i >= rows - 3 && j < 3&&(rows === 4) && cols === rows) {
              // Render a merged cell in the bottom-left corner for the last 3x3 cells
              if (i === rows - 3 && j === 0) {
                row.push(
                  <td
                  key={`${i}-${j}`}
                  colSpan={3}
                  rowSpan={3}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                  onDrop={(event) => handleCellDrop(event, cellIndex)}
                  onDragOver={(event) => handleDragOver(event)}
                  onDragLeave={(event) => handleDragLeaveCell(event, cellIndex)}
                  >
                    {cellVideos[cellIndex] && (
                    <div style={{ width: '100%', height: '100%' }} draggable
                    onDragStart={(event) => handleDragStartCell(event, cellIndex)}>
                      {/* Display video or other content here */}
                      
                      <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
                    </div>
                  )}
                  </td>
                );
              } 
            } else {
              // Render regular cells
              row.push(
                <td
                  key={`${i}-${j}`}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                  onDrop={(event) => handleCellDrop(event, cellIndex)}
                  onDragOver={(event) => handleDragOver(event)}
                  onDragLeave={(event) => handleDragLeaveCell(event, cellIndex)}
                >
                  {cellVideos[cellIndex] && (
                    <div style={{ width: '100%', height: '100%' }} draggable
                    onDragStart={(event) => handleDragStartCell(event, cellIndex)}>
                      {/* Display video or other content here */}
                      <VideoPlayer source={cellVideos[cellIndex]}  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}/>
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
    
    export default TablemergeComponent;
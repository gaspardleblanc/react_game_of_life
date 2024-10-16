import React from 'react';
import './Grid.css';

const Grid = ({ grid, toggleCell }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? 'alive' : ''}`}
            onClick={() => toggleCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;

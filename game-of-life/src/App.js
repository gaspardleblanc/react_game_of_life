import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import './App.css';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [grid, setGrid] = useState(Array(30).fill().map(() => Array(30).fill(false)));
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleCell = (row, col) => {
    const newGrid = grid.map(arr => [...arr]);
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const step = () => {
    const newGrid = grid.map(arr => [...arr]);
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const aliveNeighbors = countAliveNeighbors(row, col);
        if (grid[row][col]) {
          newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
        } else {
          newGrid[row][col] = aliveNeighbors === 3;
        }
      }
    }
    setGrid(newGrid);
  };

  const countAliveNeighbors = (row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    
    let count = 0;
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        count += grid[newRow][newCol] ? 1 : 0;
      }
    }
    return count;
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(step, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, grid]);

  const handleClear = () => {
    setGrid(Array(30).fill().map(() => Array(30).fill(false)));
  };

  return (
    <div className={`app ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      <h1>Conway's Game of Life</h1>
      <label>
        <input type="checkbox" onChange={() => setIsLightMode(!isLightMode)} />
        Toggle Light/Dark Mode
      </label>
      <Grid grid={grid} toggleCell={toggleCell} />
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default App;

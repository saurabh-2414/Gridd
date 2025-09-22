import React, { useState, useEffect, useRef } from "react";
import { toggleCell, toggleAll, checkerPattern } from "./pattern"; // import functions

const DynamicGrid = () => {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Initialize grid
  useEffect(() => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    setGrid(newGrid);
  }, [rows, cols]);

  // Run pattern (toggle all)
  const runPattern = () => {
    setGrid((g) => toggleAll(g)); // uses pattern.js
  };

  // Start / Stop loop
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(runPattern, 500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setRunning(!running)} style={{ marginLeft: "10px",
           fontSize: "12px", backgroundColor: "rgba(81, 232, 58, 1)", border: "none",color: "black"}}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setGrid(checkerPattern(rows, cols))} style={{ marginLeft: "10px",
           fontSize: "12px",backgroundColor: "#416bf6ff", border: "none" }}>
         
          Checkerboard
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 30px)`,
          gap: "2px",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() =>
                setGrid((prevGrid) => toggleCell(prevGrid, r, c))
              }
              style={{
                width: 30,
                height: 30,
                backgroundColor: cell ? "black" : "white",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicGrid;

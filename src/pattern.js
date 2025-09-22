// src/pattern.js

// Toggle a single cell
export function toggleCell(grid, r, c) {
  return grid.map((row, i) =>
    row.map((cell, j) => (i === r && j === c ? 1 - cell : cell))
  );
}

// Simple pattern: invert all cells
export function toggleAll(grid) {
  return grid.map((row) => row.map((cell) => 1 - cell));
}

// Example: Checkerboard pattern
export function checkerPattern(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (r + c) % 2)
  );
}
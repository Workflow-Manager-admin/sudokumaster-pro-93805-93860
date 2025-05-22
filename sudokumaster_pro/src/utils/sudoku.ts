/**
 * Utility functions for the Sudoku game
 */
import { CellValue, Difficulty, GameGrid, SudokuGrid } from "@/types/sudoku";

// Creates an empty 9x9 Sudoku grid
export function createEmptyGrid(): SudokuGrid {
  return Array(9).fill(null).map(() => Array(9).fill(null));
}

// Creates an empty game grid with cell objects
export function createEmptyGameGrid(): GameGrid {
  return Array(9).fill(null).map((_, rowIndex) => 
    Array(9).fill(null).map((_, colIndex) => ({
      value: null,
      isFixed: false,
      notes: [],
      isValid: true,
      row: rowIndex,
      col: colIndex
    }))
  );
}

// Determines if a value is valid for a cell at given row and column
export function isValidMove(grid: SudokuGrid, row: number, col: number, value: number): boolean {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === value) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (grid[i][j] === value) {
        return false;
      }
    }
  }

  return true;
}

// Checks if the board is complete and valid
export function isBoardComplete(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null || !isValidMove(grid, row, col, grid[row][col] as number)) {
        return false;
      }
    }
  }
  return true;
}

// Simple puzzle generator for initial implementation
// In a real implementation, this would be more sophisticated
export function generatePuzzle(difficulty: Difficulty): GameGrid {
  const gameGrid = createEmptyGameGrid();
  const solution = generateSolution();
  
  // Number of cells to reveal based on difficulty
  const cellsToReveal = getDifficultyCellCount(difficulty);
  
  // Convert solution to game grid with fixed cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      gameGrid[row][col].value = null;
    }
  }
  
  // Randomly reveal cells
  let cellsRevealed = 0;
  while (cellsRevealed < cellsToReveal) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (gameGrid[row][col].value === null) {
      gameGrid[row][col].value = solution[row][col];
      gameGrid[row][col].isFixed = true;
      cellsRevealed++;
    }
  }
  
  return gameGrid;
}

// Helper function to determine how many cells to reveal based on difficulty
function getDifficultyCellCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case Difficulty.EASY:
      return 35; // Show many cells
    case Difficulty.MEDIUM:
      return 30;
    case Difficulty.HARD:
      return 25;
    case Difficulty.EXPERT:
      return 20; // Show few cells
    default:
      return 30;
  }
}

// Placeholder for a full-fledged Sudoku generator algorithm
// In a real implementation, this would use backtracking or other algorithms
function generateSolution(): SudokuGrid {
  // For demonstration purposes, we'll return a pre-made valid Sudoku solution
  // In a real implementation, this would generate a random valid solution
  return [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
}

// Validates all cells in the game grid
export function validateGrid(grid: GameGrid): GameGrid {
  const values: SudokuGrid = grid.map(row => row.map(cell => cell.value));
  
  const newGrid = JSON.parse(JSON.stringify(grid)) as GameGrid;
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = newGrid[row][col].value;
      if (value !== null) {
        // Save original value
        const originalValue = values[row][col];
        // Temporarily remove the value to avoid self-conflicts
        values[row][col] = null;
        
        // Check if the value is valid at this position
        newGrid[row][col].isValid = isValidMove(values, row, col, value);
        
        // Restore original value
        values[row][col] = originalValue;
      } else {
        // Empty cells are always valid
        newGrid[row][col].isValid = true;
      }
    }
  }
  
  return newGrid;
}

// Format time from seconds to MM:SS
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

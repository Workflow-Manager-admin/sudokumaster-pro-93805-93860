"use client";

import { Cell, GameGrid } from "@/types/sudoku";
import React from "react";
import SudokuCell from "./SudokuCell";

interface SudokuBoardProps {
  grid: GameGrid;
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
}

/**
 * Renders the complete 9x9 Sudoku board
 * 
 * @param grid - The current game grid
 * @param selectedCell - Currently selected cell coordinates
 * @param onCellSelect - Function to call when a cell is selected
 * @returns A Sudoku board component
 */
const SudokuBoard: React.FC<SudokuBoardProps> = ({ 
  grid, 
  selectedCell, 
  onCellSelect 
}) => {
  return (
    <div 
      className="grid grid-cols-9 grid-rows-9 gap-0 w-full max-w-[500px] aspect-square 
                border-2 border-black dark:border-white bg-white dark:bg-gray-800 shadow-lg"
    >
      {grid.flat().map((cell) => (
        <SudokuCell
          key={`${cell.row}-${cell.col}`}
          cell={cell}
          isSelected={
            selectedCell?.row === cell.row && selectedCell?.col === cell.col
          }
          onSelect={() => onCellSelect(cell.row, cell.col)}
        />
      ))}
    </div>
  );
};

export default SudokuBoard;

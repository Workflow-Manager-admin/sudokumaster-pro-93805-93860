"use client";

import { Cell } from "@/types/sudoku";
import React from "react";

interface SudokuCellProps {
  cell: Cell;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Represents a single cell in the Sudoku grid
 * 
 * @param cell - The cell data
 * @param isSelected - Whether the cell is currently selected
 * @param onSelect - Function to call when the cell is selected
 * @returns A Sudoku cell component
 */
const SudokuCell: React.FC<SudokuCellProps> = ({ cell, isSelected, onSelect }) => {
  const { value, isFixed, notes, isValid } = cell;

  // Determine cell styling based on its state
  const cellClasses = `
    w-full h-full flex items-center justify-center
    border border-gray-300
    transition-colors duration-200
    text-xl font-medium
    ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}
    ${!isValid ? 'text-red-600 dark:text-red-400' : isFixed ? 'font-bold text-black dark:text-white' : 'text-blue-600 dark:text-blue-300'}
    ${(cell.row % 3 === 2 && cell.row !== 8) ? 'border-b-2 border-b-black dark:border-b-white' : ''}
    ${(cell.col % 3 === 2 && cell.col !== 8) ? 'border-r-2 border-r-black dark:border-r-white' : ''}
    cursor-pointer
    outline-none
  `;

  return (
    <div
      className={cellClasses}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-label={`Cell at row ${cell.row + 1}, column ${cell.col + 1}, value ${value || 'empty'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect();
        }
      }}
    >
      {value ? (
        value
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-0 w-full h-full p-0.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div key={n} className="flex items-center justify-center text-[0.5rem]">
              {notes.includes(n) ? n : ""}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SudokuCell;

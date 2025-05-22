"use client";

import React from "react";

interface NumberPadProps {
  onNumberSelect: (number: number) => void;
  onClearCell: () => void;
  onToggleNote: (number: number) => void;
  isNoteMode: boolean;
  toggleNoteMode: () => void;
}

/**
 * Component for selecting numbers to input into the Sudoku grid
 * 
 * @param onNumberSelect - Function to call when a number is selected
 * @param onClearCell - Function to call when the clear button is pressed
 * @param onToggleNote - Function to call when a note number is toggled
 * @param isNoteMode - Whether note mode is active
 * @param toggleNoteMode - Function to toggle note mode
 * @returns A number pad component
 */
const NumberPad: React.FC<NumberPadProps> = ({
  onNumberSelect,
  onClearCell,
  onToggleNote,
  isNoteMode,
  toggleNoteMode,
}) => {
  // Array of numbers 1-9 for the number pad
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleNumberClick = (num: number) => {
    if (isNoteMode) {
      onToggleNote(num);
    } else {
      onNumberSelect(num);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
      <div className="flex justify-between w-full">
        <button
          onClick={toggleNoteMode}
          className={`px-4 py-2 rounded-md transition-colors ${
            isNoteMode
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
          aria-pressed={isNoteMode}
        >
          Notes Mode
        </button>
        <button
          onClick={onClearCell}
          className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-md transition-colors"
        >
          Clear Cell
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        {numbers.map((num) => (
          <button
            key={num}
            className="aspect-square text-2xl font-bold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;

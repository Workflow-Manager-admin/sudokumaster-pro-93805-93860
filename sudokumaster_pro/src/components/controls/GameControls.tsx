"use client";

import { formatTime } from "@/utils/sudoku";
import React from "react";

interface GameControlsProps {
  timer: number;
  moves: number;
  onNewGame: () => void;
  onValidateBoard: () => void;
  isComplete: boolean;
}

/**
 * Component for game controls like timer, new game button, etc.
 * 
 * @param timer - Current game timer in seconds
 * @param moves - Number of moves made
 * @param onNewGame - Function to start a new game
 * @param onValidateBoard - Function to validate the current board state
 * @param isComplete - Whether the game is complete
 * @returns A game controls component
 */
const GameControls: React.FC<GameControlsProps> = ({
  timer,
  moves,
  onNewGame,
  onValidateBoard,
  isComplete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">Time</span>
          <span className="text-xl font-mono">{formatTime(timer)}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">Moves</span>
          <span className="text-xl font-mono">{moves}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onValidateBoard}
          className="px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-md transition-colors"
        >
          Validate
        </button>
        
        <button
          onClick={onNewGame}
          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
        >
          New Game
        </button>
      </div>
      
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Puzzle Completed!</h2>
            <p className="mb-4">
              Time: {formatTime(timer)} | Moves: {moves}
            </p>
            <button
              onClick={onNewGame}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
            >
              Start New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;

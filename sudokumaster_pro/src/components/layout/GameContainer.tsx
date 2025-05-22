"use client";

import { Difficulty, GameState, SudokuAction } from "@/types/sudoku";
import { generatePuzzle, validateGrid } from "@/utils/sudoku";
import React, { useEffect, useReducer } from "react";
import DifficultySelector from "../controls/DifficultySelector";
import GameControls from "../controls/GameControls";
import NumberPad from "../controls/NumberPad";
import SudokuBoard from "../sudoku/SudokuBoard";

// Initial game state
const initialState: GameState = {
  grid: generatePuzzle(Difficulty.EASY),
  difficulty: Difficulty.EASY,
  isComplete: false,
  timer: 0,
  moves: 0,
  selectedCell: null,
};

// Reducer function to handle game state updates
function gameReducer(state: GameState, action: SudokuAction): GameState {
  switch (action.type) {
    case "SET_VALUE": {
      if (!state.selectedCell || state.grid[action.row][action.col].isFixed) {
        return state;
      }

      // Create a new grid with the updated value
      const newGrid = [...state.grid];
      newGrid[action.row][action.col] = {
        ...newGrid[action.row][action.col],
        value: action.value,
        notes: [], // Clear notes when setting a value
      };

      // Check if the board is complete
      const isComplete = newGrid.flat().every(
        (cell) => cell.value !== null && cell.isValid
      );

      return {
        ...state,
        grid: newGrid,
        moves: state.moves + 1,
        isComplete,
      };
    }

    case "TOGGLE_NOTE": {
      if (
        !state.selectedCell ||
        state.grid[action.row][action.col].isFixed ||
        state.grid[action.row][action.col].value !== null
      ) {
        return state;
      }

      const cell = state.grid[action.row][action.col];
      const newNotes = [...cell.notes];
      
      // Toggle the note
      const noteIndex = newNotes.indexOf(action.note);
      if (noteIndex === -1) {
        newNotes.push(action.note);
      } else {
        newNotes.splice(noteIndex, 1);
      }

      // Create a new grid with the updated notes
      const newGrid = [...state.grid];
      newGrid[action.row][action.col] = {
        ...cell,
        notes: newNotes,
      };

      return {
        ...state,
        grid: newGrid,
        moves: state.moves + 1,
      };
    }

    case "SELECT_CELL":
      return {
        ...state,
        selectedCell: { row: action.row, col: action.col },
      };

    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedCell: null,
      };

    case "NEW_GAME":
      return {
        ...initialState,
        difficulty: action.difficulty,
        grid: generatePuzzle(action.difficulty),
        timer: 0,
        moves: 0,
      };

    case "TICK_TIMER":
      return {
        ...state,
        timer: state.timer + 1,
      };

    case "VALIDATE_BOARD":
      return {
        ...state,
        grid: validateGrid(state.grid),
      };

    default:
      return state;
  }
}

/**
 * Main container component for the Sudoku game
 * 
 * @returns The game container component
 */
const GameContainer: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [isNoteMode, setIsNoteMode] = React.useState(false);

  // Set up timer
  useEffect(() => {
    if (state.isComplete) return;
    
    const timerInterval = setInterval(() => {
      dispatch({ type: "TICK_TIMER" });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [state.isComplete]);

  // Handle number selection
  const handleNumberSelect = (num: number) => {
    if (!state.selectedCell) return;

    dispatch({
      type: "SET_VALUE",
      row: state.selectedCell.row,
      col: state.selectedCell.col,
      value: num,
    });
  };

  // Handle cell selection
  const handleCellSelect = (row: number, col: number) => {
    dispatch({ type: "SELECT_CELL", row, col });
  };

  // Handle note toggling
  const handleToggleNote = (num: number) => {
    if (!state.selectedCell) return;

    dispatch({
      type: "TOGGLE_NOTE",
      row: state.selectedCell.row,
      col: state.selectedCell.col,
      note: num,
    });
  };

  // Handle cell clearing
  const handleClearCell = () => {
    if (!state.selectedCell) return;

    dispatch({
      type: "SET_VALUE",
      row: state.selectedCell.row,
      col: state.selectedCell.col,
      value: null,
    });
  };

  // Start a new game
  const handleNewGame = () => {
    dispatch({
      type: "NEW_GAME",
      difficulty: state.difficulty,
    });
  };

  // Change difficulty
  const handleDifficultyChange = (difficulty: Difficulty) => {
    dispatch({
      type: "NEW_GAME",
      difficulty,
    });
  };

  // Validate the board
  const handleValidateBoard = () => {
    dispatch({ type: "VALIDATE_BOARD" });
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">SudokuMaster Pro</h1>
      
      <GameControls
        timer={state.timer}
        moves={state.moves}
        onNewGame={handleNewGame}
        onValidateBoard={handleValidateBoard}
        isComplete={state.isComplete}
      />
      
      <div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center lg:items-start">
        <div className="flex flex-col gap-8 items-center">
          <SudokuBoard
            grid={state.grid}
            selectedCell={state.selectedCell}
            onCellSelect={handleCellSelect}
          />
          
          <NumberPad
            onNumberSelect={handleNumberSelect}
            onClearCell={handleClearCell}
            onToggleNote={handleToggleNote}
            isNoteMode={isNoteMode}
            toggleNoteMode={() => setIsNoteMode(!isNoteMode)}
          />
        </div>
        
        <div className="flex flex-col gap-8 w-full lg:w-auto">
          <DifficultySelector
            currentDifficulty={state.difficulty}
            onSelectDifficulty={handleDifficultyChange}
          />
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">How to Play</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Select a cell by clicking on it</li>
              <li>Enter a number using the number pad</li>
              <li>Use Notes Mode to add small notes to cells</li>
              <li>Validate your progress with the Validate button</li>
              <li>Start a new game with your preferred difficulty</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;

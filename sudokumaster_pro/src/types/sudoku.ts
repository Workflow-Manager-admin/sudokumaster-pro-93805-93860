/**
 * Types for the Sudoku game
 */

export type CellValue = number | null;

export type SudokuGrid = CellValue[][];

export interface Cell {
  value: CellValue;
  isFixed: boolean;
  notes: number[];
  isValid: boolean;
  row: number;
  col: number;
}

export type GameGrid = Cell[][];

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export interface GameState {
  grid: GameGrid;
  difficulty: Difficulty;
  isComplete: boolean;
  timer: number;
  moves: number;
  selectedCell: { row: number; col: number } | null;
}

export type SudokuAction = 
  | { type: 'SET_VALUE'; row: number; col: number; value: CellValue }
  | { type: 'TOGGLE_NOTE'; row: number; col: number; note: number }
  | { type: 'SELECT_CELL'; row: number; col: number }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'NEW_GAME'; difficulty: Difficulty }
  | { type: 'TICK_TIMER' }
  | { type: 'VALIDATE_BOARD' };

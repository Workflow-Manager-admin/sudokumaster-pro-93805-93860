"use client";

import { Difficulty } from "@/types/sudoku";
import React from "react";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

/**
 * Component for selecting game difficulty
 * 
 * @param currentDifficulty - Currently selected difficulty
 * @param onSelectDifficulty - Function to call when difficulty is changed
 * @returns A difficulty selector component
 */
const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelectDifficulty,
}) => {
  const difficulties = [
    { value: Difficulty.EASY, label: "Easy" },
    { value: Difficulty.MEDIUM, label: "Medium" },
    { value: Difficulty.HARD, label: "Hard" },
    { value: Difficulty.EXPERT, label: "Expert" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-lg font-semibold">Difficulty</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentDifficulty === difficulty.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => onSelectDifficulty(difficulty.value)}
            aria-pressed={currentDifficulty === difficulty.value}
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;

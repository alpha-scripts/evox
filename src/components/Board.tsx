"use client";

import { Square } from "./Square";
import type { Board } from "../lib/game";
import { useState, useCallback, useEffect, useRef } from "react";

interface BoardProps {
  board: Board;
  onSquareClick: (index: number) => void;
  winningCells?: number[];
  disabled?: boolean;
}

export function Board({
  board,
  onSquareClick,
  winningCells = [],
  disabled = false,
}: BoardProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const squareRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset focus when board resets
  useEffect(() => {
    const isEmpty = board.every((cell) => cell === null);
    if (isEmpty) {
      setFocusedIndex(null);
    }
  }, [board]);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (disabled) return;

      const row = Math.floor(index / 3);
      const col = index % 3;
      let newIndex: number | null = null;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (row > 0) {
            newIndex = index - 3;
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (row < 2) {
            newIndex = index + 3;
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (col > 0) {
            newIndex = index - 1;
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (col < 2) {
            newIndex = index + 1;
          }
          break;
        case "Home":
          e.preventDefault();
          newIndex = row * 3; // First column of current row
          break;
        case "End":
          e.preventDefault();
          newIndex = row * 3 + 2; // Last column of current row
          break;
        default:
          return;
      }

      if (newIndex !== null && newIndex >= 0 && newIndex < 9) {
        setFocusedIndex(newIndex);
        squareRefs.current[newIndex]?.focus();
      }
    },
    [disabled]
  );

  return (
    <div role="grid" aria-label="Tic Tac Toe board">
      <div
        className="w-fit mx-auto grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6"
        role="rowgroup"
      >
        {board.map((value, index) => {
          const row = Math.floor(index / 3);
          const isFirstInRow = index % 3 === 0;
          
          return (
            <div
              key={index}
              role="gridcell"
              aria-rowindex={row + 1}
              aria-colindex={(index % 3) + 1}
            >
              <Square
                ref={(el) => {
                  squareRefs.current[index] = el;
                }}
                value={value}
                onClick={() => onSquareClick(index)}
                disabled={disabled}
                isWinning={winningCells.includes(index)}
                index={index}
                tabIndex={focusedIndex === index || (focusedIndex === null && index === 0 && !value && !disabled) ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}


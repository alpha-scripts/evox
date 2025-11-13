"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Board, Header, Controls } from "@/src/components";
import {
  createEmptyBoard,
  makeMove,
  checkWinner,
  getBestMove,
  getWinningCells,
  type Board as BoardType,
  type Player,
  type Difficulty,
} from "@/src/lib/game";

export default function Home() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [gameMode, setGameMode] = useState<"1P" | "2P">("2P");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [isAITurning, setIsAITurning] = useState(false);
  const aiMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAIMovingRef = useRef(false);
  const boardRef = useRef<BoardType>(board);
  
  // Keep board ref in sync with board state
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // Check for winner after each move
  useEffect(() => {
    const gameWinner = checkWinner(board);
    setWinner(gameWinner);
    
    if (gameWinner && gameWinner !== "draw") {
      const cells = getWinningCells(board);
      setWinningCells(cells);
    } else {
      setWinningCells([]);
    }
  }, [board]);

  // Handle AI move in 1P mode
  useEffect(() => {
    // Clean up any pending AI move
    const cleanup = () => {
      if (aiMoveTimeoutRef.current) {
        clearTimeout(aiMoveTimeoutRef.current);
        aiMoveTimeoutRef.current = null;
      }
      isAIMovingRef.current = false;
    };

    // Only trigger AI move if conditions are met
    if (
      gameMode === "1P" &&
      !winner &&
      currentPlayer === "O" &&
      !isAIMovingRef.current
    ) {
      cleanup(); // Clean up any existing timeout
      isAIMovingRef.current = true;
      setIsAITurning(true);
      
      // Add a small delay for better UX
      aiMoveTimeoutRef.current = setTimeout(() => {
        // Get latest board state from ref
        const currentBoardState = boardRef.current;
        
        // Check if game is still ongoing
        const gameWinner = checkWinner(currentBoardState);
        if (gameWinner) {
          isAIMovingRef.current = false;
          setIsAITurning(false);
          aiMoveTimeoutRef.current = null;
          return;
        }
        
        // Make AI move
        const aiMove = getBestMove(currentBoardState, "O", difficulty);
        
        if (aiMove !== null) {
          const newBoard = makeMove(currentBoardState, aiMove, "O");
          if (newBoard) {
            // Update board and switch to player X
            setBoard(newBoard);
            setCurrentPlayer("X");
            isAIMovingRef.current = false;
            setIsAITurning(false);
            aiMoveTimeoutRef.current = null;
            return;
          }
        }
        
        // No valid move or game ended
        isAIMovingRef.current = false;
        setIsAITurning(false);
        aiMoveTimeoutRef.current = null;
      }, 300); // 300ms delay to show AI is "thinking"

      return cleanup;
    }

    return cleanup;
  }, [board, currentPlayer, gameMode, difficulty, winner]);

  // Handle square click
  const handleSquareClick = useCallback(
    (index: number) => {
      // Don't allow moves if game is over or it's AI's turn
      if (winner || isAITurning || !currentPlayer) {
        return;
      }

      // In 1P mode, only allow X (player) to move
      if (gameMode === "1P" && currentPlayer === "O") {
        return;
      }

      // Try to make the move
      const newBoard = makeMove(board, index, currentPlayer);
      if (!newBoard) {
        return; // Invalid move
      }

      setBoard(newBoard);

      // Switch player
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    },
    [board, currentPlayer, winner, gameMode, isAITurning]
  );

  // Handle new game
  const handleNewGame = useCallback(() => {
    // Clean up any pending AI moves
    if (aiMoveTimeoutRef.current) {
      clearTimeout(aiMoveTimeoutRef.current);
      aiMoveTimeoutRef.current = null;
    }
    isAIMovingRef.current = false;
    
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells([]);
    setIsAITurning(false);
  }, []);

  // Handle mode toggle
  const handleModeToggle = useCallback(() => {
    const newMode = gameMode === "1P" ? "2P" : "1P";
    setGameMode(newMode);
    // Reset game when changing mode
    handleNewGame();
  }, [gameMode, handleNewGame]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback(
    (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
      // Reset game when changing difficulty
      handleNewGame();
    },
    [handleNewGame]
  );

  // Check if game is disabled
  const isGameDisabled = winner !== null || isAITurning;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-destructive/5 dark:from-primary/10 dark:via-background dark:to-destructive/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Glassmorphism Card Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${gameMode}-${difficulty}`}
          className="relative w-full max-w-2xl mx-auto space-y-6 md:space-y-8 z-10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Glassmorphism Card */}
          <motion.div
            className="backdrop-blur-xl bg-card/80 dark:bg-card/60 border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Header
              gameMode={gameMode}
              currentPlayer={currentPlayer}
              winner={winner}
              difficulty={difficulty}
            />

            <Board
              board={board}
              onSquareClick={handleSquareClick}
              winningCells={winningCells}
              disabled={isGameDisabled}
            />

            <Controls
              onNewGame={handleNewGame}
              onModeToggle={handleModeToggle}
              onDifficultyChange={handleDifficultyChange}
              gameMode={gameMode}
              difficulty={difficulty}
              disabled={isAITurning && !winner}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

interface HeaderProps {
  gameMode?: "1P" | "2P";
  currentPlayer?: "X" | "O" | null;
  winner?: "X" | "O" | "draw" | null;
  difficulty?: "easy" | "medium" | "hard";
}

export function Header({
  gameMode = "2P",
  currentPlayer = null,
  winner = null,
  difficulty,
}: HeaderProps) {
  const getStatusText = () => {
    if (winner === "draw") {
      return "It's a draw!";
    }
    if (winner) {
      return `Player ${winner} wins!`;
    }
    if (gameMode === "1P" && currentPlayer === "O") {
      return `AI thinking... (${difficulty || "medium"})`;
    }
    if (currentPlayer) {
      return `Player ${currentPlayer}'s turn`;
    }
    return "Click a square to start";
  };

  return (
    <motion.header
      className="text-center space-y-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center gap-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <Gamepad2 className="h-8 w-8 md:h-10 md:w-10 text-primary" aria-hidden="true" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
          Tic Tac Toe
        </h1>
      </motion.div>
      
      <motion.p
        className="text-lg md:text-xl text-muted-foreground font-medium"
        key={`${winner}-${currentPlayer}-${gameMode}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {getStatusText()}
      </motion.p>
      
      {gameMode && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>Mode:</span>
          <span className="font-bold" aria-label={`Game mode: ${gameMode === "1P" ? "1 player" : "2 players"}`}>
            {gameMode}
          </span>
          {gameMode === "1P" && difficulty && (
            <span className="text-xs opacity-75" aria-label={`Difficulty: ${difficulty}`}>
              ({difficulty})
            </span>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}


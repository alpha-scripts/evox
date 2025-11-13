"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Users, Cpu, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Difficulty } from "../lib/game";

interface ControlsProps {
  onNewGame: () => void;
  onModeToggle: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  gameMode: "1P" | "2P";
  difficulty: Difficulty;
  disabled?: boolean;
  showOnlineButton?: boolean;
}

export function Controls({
  onNewGame,
  onModeToggle,
  onDifficultyChange,
  gameMode,
  difficulty,
  disabled = false,
  showOnlineButton = true,
}: ControlsProps) {
  const router = useRouter();
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  const handlePlayOnline = () => {
    // Generate a unique room ID
    const roomId = crypto.randomUUID();
    router.push(`/online/${roomId}`);
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Button
        onClick={onNewGame}
        disabled={false}
        size="lg"
        className="min-w-[140px]"
        aria-label="Start a new game"
      >
        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
        New Game
      </Button>

      {showOnlineButton && (
        <Button
          onClick={handlePlayOnline}
          variant="default"
          size="lg"
          className="min-w-[140px] bg-primary"
          aria-label="Play online with another player"
        >
          <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
          Play Online
        </Button>
      )}

      <Button
        onClick={onModeToggle}
        variant="outline"
        size="lg"
        className="min-w-[140px]"
        disabled={disabled}
        aria-label={`Switch to ${gameMode === "1P" ? "2 player" : "1 player"} mode`}
        aria-pressed={gameMode === "1P"}
      >
        {gameMode === "1P" ? (
          <>
            <Cpu className="mr-2 h-4 w-4" aria-hidden="true" />
            AI Mode
          </>
        ) : (
          <>
            <Users className="mr-2 h-4 w-4" aria-hidden="true" />
            2 Players
          </>
        )}
      </Button>

      {gameMode === "1P" && (
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {difficulties.map((diff) => (
            <Button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              variant={difficulty === diff ? "default" : "outline"}
              size="sm"
              disabled={disabled}
              className="capitalize min-w-[80px]"
              aria-label={`Set difficulty to ${diff}`}
              aria-pressed={difficulty === diff}
            >
              {diff}
            </Button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}


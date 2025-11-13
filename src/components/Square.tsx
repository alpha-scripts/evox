"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Player } from "../lib/game";
import { useEffect, useState, forwardRef } from "react";

interface SquareProps {
  value: Player;
  onClick: () => void;
  disabled?: boolean;
  isWinning?: boolean;
  index: number;
  ariaLabel?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Square = forwardRef<HTMLButtonElement, SquareProps>(function Square(
  {
    value,
    onClick,
    disabled = false,
    isWinning = false,
    index,
    ariaLabel,
    tabIndex,
    onKeyDown,
  },
  ref
) {
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [value]);

  // Generate accessible label
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const position = `Row ${row}, Column ${col}`;
    
    if (value === null) {
      return `${position}, empty square${isWinning ? ", winning" : ""}`;
    }
    return `${position}, ${value}${isWinning ? ", winning" : ""}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    
    // Allow Enter and Space to trigger click
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled && value === null) {
        onClick();
      }
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || value !== null}
      role="button"
      aria-label={getAriaLabel()}
      aria-disabled={disabled || value !== null}
      tabIndex={tabIndex}
      className={cn(
        "relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-xl border-2",
        "bg-background/50 dark:bg-card/50 backdrop-blur-sm",
        "border-border/50 hover:border-primary/50",
        "text-card-foreground transition-all duration-200",
        "hover:bg-accent/50 hover:text-accent-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "shadow-md hover:shadow-lg",
        !value && !disabled && "hover:scale-105 cursor-pointer active:scale-95",
        isWinning && "border-primary shadow-primary/50 shadow-2xl"
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut"
      }}
      whileHover={!disabled && !value ? { 
        scale: 1.05,
        y: -2
      } : {}}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
    >
      {/* Winning Glow Effect */}
      {isWinning && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Mark Content */}
      {value && (
        <span
          className={cn(
            "relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none",
            value === "X" && "text-primary drop-shadow-lg",
            value === "O" && "text-destructive drop-shadow-lg"
          )}
        >
          {value}
        </span>
      )}

      {/* Pulse effect for winning cells */}
      {isWinning && value && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.2, 1.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}

      {/* Hover effect for empty squares */}
      {!value && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/0 hover:bg-primary/10 transition-colors duration-200"
        />
      )}
    </motion.button>
  );
});

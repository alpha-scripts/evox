"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Board, Header, Controls } from "@/src/components";
import {
  createEmptyBoard,
  checkWinner,
  getWinningCells,
  type Board as BoardType,
  type Player,
} from "@/src/lib/game";
import { RealtimeGame, type ConnectionStatus, type OpponentStatus } from "@/src/lib/realtime";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowLeft, Wifi, WifiOff, Users } from "lucide-react";

export default function OnlineGamePage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [opponentStatus, setOpponentStatus] = useState<OpponentStatus>("waiting");
  const [playerRole, setPlayerRole] = useState<"X" | "O" | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const realtimeRef = useRef<RealtimeGame | null>(null);
  const playerIdRef = useRef<string>(
    typeof window !== "undefined" 
      ? localStorage.getItem("playerId") || `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  // Initialize player ID
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("playerId");
      if (!storedId) {
        localStorage.setItem("playerId", playerIdRef.current);
      } else {
        playerIdRef.current = storedId;
      }
    }
  }, []);

  // Initialize realtime connection
  useEffect(() => {
    const initRealtime = async () => {
      const { RealtimeGame } = await import("@/src/lib/realtime");
      
      const realtime = new RealtimeGame(roomId, playerIdRef.current, {
        onMove: (newBoard, newCurrentPlayer, newWinner, newWinningCells) => {
          setBoard(newBoard);
          setCurrentPlayer(newCurrentPlayer);
          setWinner(newWinner);
          setWinningCells(newWinningCells);
          setIsMyTurn(newCurrentPlayer === realtime.getPlayerRole());
        },
        onOpponentJoin: () => {
          setOpponentStatus("connected");
        },
        onOpponentLeave: () => {
          setOpponentStatus("disconnected");
        },
        onGameReset: () => {
          setBoard(createEmptyBoard());
          setCurrentPlayer("X");
          setWinner(null);
          setWinningCells([]);
          setIsMyTurn(realtime.getPlayerRole() === "X");
        },
        onConnectionChange: (status) => {
          setConnectionStatus(status);
        },
        onOpponentStatusChange: (status) => {
          setOpponentStatus(status);
        },
      });

      realtimeRef.current = realtime;

      // Join or create room
      const joinResult = await realtime.joinRoom();
      if (!joinResult.success) {
        const errorMsg = joinResult.error || "Unknown error";
        console.error("Failed to join room:", errorMsg);
        setConnectionStatus("error");
        
        // Set appropriate error message
        if (errorMsg.includes("not configured")) {
          setErrorMessage("Supabase is not configured. Please check your .env.local file and restart the dev server.");
        } else if (errorMsg.includes("Room is full")) {
          setErrorMessage("Room is full. This room already has 2 players.");
        } else if (errorMsg.includes("Room not found") || errorMsg.includes("not found")) {
          setErrorMessage("Room not found. The room ID is invalid or the room has been deleted.");
        } else if (errorMsg.includes("duplicate key") || errorMsg.includes("already exists")) {
          // Room already exists - try to reconnect by fetching the room state
          console.log("Room already exists, attempting to reconnect...");
          setErrorMessage(null);
          await realtime.connect(); // This will fetch the existing room state
        } else {
          setErrorMessage(errorMsg || "Failed to join room. Please try again.");
        }
        
        // Don't return if it's a duplicate key error (we're trying to reconnect)
        if (!errorMsg.includes("duplicate key") && !errorMsg.includes("already exists")) {
          return;
        }
      } else {
        setErrorMessage(null);
      }
      
      if (joinResult.success && joinResult.playerRole) {
        setPlayerRole(joinResult.playerRole);
        setIsMyTurn(joinResult.playerRole === "X");
      }

      // Connect to realtime
      await realtime.connect();
    };

    initRealtime().catch(console.error);

    return () => {
      if (realtimeRef.current) {
        realtimeRef.current.disconnect();
      }
    };
  }, [roomId]);

  const handleSquareClick = useCallback(
    async (index: number) => {
      if (!realtimeRef.current || winner || !isMyTurn || !playerRole) {
        return;
      }

      if (currentPlayer !== playerRole) {
        return; // Not this player's turn
      }

      const success = await realtimeRef.current.makeMove(index, board, currentPlayer);
      if (!success) {
        console.error("Failed to make move");
      }
    },
    [board, currentPlayer, winner, isMyTurn, playerRole]
  );

  const handleNewGame = useCallback(async () => {
    if (realtimeRef.current) {
      await realtimeRef.current.resetGame();
    }
  }, []);

  const copyRoomLink = useCallback(() => {
    const url = `${window.location.origin}/online/${roomId}`;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [roomId]);

  const getStatusMessage = () => {
    // Show error message if present
    if (errorMessage) {
      return errorMessage;
    }

    if (connectionStatus === "connecting") {
      return "Connecting...";
    }

    if (connectionStatus === "error") {
      return "Connection error. Please refresh.";
    }

    if (opponentStatus === "waiting") {
      return "Waiting for opponent...";
    }

    if (opponentStatus === "disconnected") {
      return "Opponent disconnected";
    }

    if (winner) {
      if (winner === "draw") {
        return "It's a draw!";
      }
      return winner === playerRole ? "You win!" : "Opponent wins!";
    }

    if (isMyTurn) {
      return `Your turn (${playerRole})`;
    }

    return `Opponent's turn (${currentPlayer})`;
  };

  const isGameDisabled = winner !== null || !isMyTurn || opponentStatus !== "connected";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-destructive/5 dark:from-primary/10 dark:via-background dark:to-destructive/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Glassmorphism Card Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={roomId}
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
            {/* Header with back button and connection status */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <div className="flex items-center gap-2">
                {connectionStatus === "connected" ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-muted-foreground">
                  {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>

            {/* Room Link Section */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Room ID</p>
                  <p className="text-xs text-muted-foreground font-mono break-all">{roomId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyRoomLink}
                  className="shrink-0"
                >
                  {linkCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Opponent Status */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              {opponentStatus === "waiting" && (
                <>
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Waiting for opponent...</span>
                </>
              )}
              {opponentStatus === "connected" && (
                <>
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Opponent connected</span>
                </>
              )}
              {opponentStatus === "disconnected" && (
                <>
                  <Users className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Opponent left</span>
                </>
              )}
            </div>

            {/* Game Status */}
            <div className="mb-6">
              <p className={`text-center text-lg font-semibold ${
                errorMessage ? "text-destructive" : ""
              }`}>
                {getStatusMessage()}
              </p>
            </div>

            {/* Game Board */}
            {!errorMessage && (
              <Board
                board={board}
                onSquareClick={handleSquareClick}
                winningCells={winningCells}
                disabled={isGameDisabled}
              />
            )}

            {/* Controls */}
            {!errorMessage && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleNewGame}
                  size="lg"
                  disabled={opponentStatus !== "connected"}
                  className="min-w-[140px]"
                  aria-label="Start a new game"
                >
                  New Game
                </Button>
              </div>
            )}
            
            {/* Error Action */}
            {errorMessage && (
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  onClick={() => router.push("/")}
                  size="lg"
                  variant="outline"
                  className="min-w-[140px]"
                >
                  Go Home
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  size="lg"
                  className="min-w-[140px]"
                >
                  Retry
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}


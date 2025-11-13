export type Player = "X" | "O" | null;
export type Board = Player[];

/**
 * Creates an empty 3x3 Tic Tac Toe board
 * @returns Array of 9 null values representing an empty board
 */
export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

/**
 * Makes a move on the board at the specified index
 * @param board - Current board state
 * @param index - Index where the move should be made (0-8)
 * @param player - Player making the move ("X" or "O")
 * @returns New board state with the move made, or null if move is invalid
 */
export function makeMove(
  board: Board,
  index: number,
  player: "X" | "O"
): Board | null {
  // Validate inputs
  if (index < 0 || index > 8) {
    return null; // Invalid index
  }

  if (board[index] !== null) {
    return null; // Cell already occupied
  }

  if (player !== "X" && player !== "O") {
    return null; // Invalid player
  }

  // Create a new board with the move
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

/**
 * Checks if there's a winner on the board
 * @param board - Current board state
 * @returns The winner ("X" or "O"), "draw" if board is full with no winner, or null if game continues
 */
export function checkWinner(board: Board): Player | "draw" | null {
  // Winning combinations (indices)
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner
    }
  }

  // Check for draw (board is full and no winner)
  if (isBoardFull(board)) {
    return "draw";
  }

  // No winner yet, game continues
  return null;
}

/**
 * Gets the winning cell indices if there's a winner
 * @param board - Current board state
 * @returns Array of winning cell indices, or empty array if no winner
 */
export function getWinningCells(board: Board): number[] {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination; // Return the winning combination
    }
  }

  // No winner
  return [];
}

/**
 * Checks if the board is full (no empty cells)
 * @param board - Current board state
 * @returns True if board is full, false otherwise
 */
export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Gets all available move indices (empty cells)
 * @param board - Current board state
 * @returns Array of indices where moves can be made
 */
export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

/**
 * Difficulty levels for AI opponent
 */
export type Difficulty = "easy" | "medium" | "hard";

/**
 * Gets the opponent player
 * @param player - Current player
 * @returns The opponent player
 */
function getOpponent(player: "X" | "O"): "X" | "O" {
  return player === "X" ? "O" : "X";
}

/**
 * Evaluates the board state from a player's perspective
 * @param board - Current board state
 * @param player - Player to evaluate for
 * @returns Score: 10 for win, -10 for loss, 0 for draw/ongoing
 */
function evaluateBoard(board: Board, player: "X" | "O"): number {
  const winner = checkWinner(board);
  
  if (winner === player) {
    return 10; // Player wins
  } else if (winner === getOpponent(player)) {
    return -10; // Opponent wins
  } else if (winner === "draw") {
    return 0; // Draw
  }
  
  return 0; // Game ongoing
}

/**
 * Heuristic to evaluate move quality based on position
 * Center > Corners > Edges
 * @param move - Move index
 * @returns Heuristic score (higher is better)
 */
function getMoveHeuristic(move: number): number {
  const center = 4;
  const corners = [0, 2, 6, 8];
  const edges = [1, 3, 5, 7];
  
  if (move === center) return 3;
  if (corners.includes(move)) return 2;
  if (edges.includes(move)) return 1;
  return 0;
}

/**
 * Minimax algorithm to find the best move
 * @param board - Current board state
 * @param player - Current player
 * @param depth - Maximum depth to search
 * @param isMaximizing - Whether we're maximizing or minimizing
 * @param currentDepth - Current depth in the search tree
 * @returns Score and best move index
 */
function minimax(
  board: Board,
  player: "X" | "O",
  depth: number,
  isMaximizing: boolean,
  currentDepth: number = 0
): { score: number; move: number | null } {
  const winner = checkWinner(board);
  
  // Terminal states
  if (winner === player) {
    return { score: 10 - currentDepth, move: null }; // Prefer faster wins
  } else if (winner === getOpponent(player)) {
    return { score: currentDepth - 10, move: null }; // Prefer slower losses
  } else if (winner === "draw" || isBoardFull(board)) {
    return { score: 0, move: null };
  }
  
  // Depth limit reached
  if (currentDepth >= depth) {
    return { score: 0, move: null };
  }
  
  const availableMoves = getAvailableMoves(board);
  
  // Sort moves by heuristic (center > corners > edges) for better move selection
  const sortedMoves = [...availableMoves].sort((a, b) => {
    return getMoveHeuristic(b) - getMoveHeuristic(a);
  });
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = sortedMoves[0] || null;
    let bestHeuristic = -1;
    
    for (const move of sortedMoves) {
      const newBoard = makeMove(board, move, player);
      if (!newBoard) continue;
      
      const result = minimax(
        newBoard,
        player,
        depth,
        false,
        currentDepth + 1
      );
      
      const moveHeuristic = getMoveHeuristic(move);
      
      // Prefer moves with better score, or equal score with better heuristic
      if (
        result.score > bestScore ||
        (result.score === bestScore && moveHeuristic > bestHeuristic)
      ) {
        bestScore = result.score;
        bestMove = move;
        bestHeuristic = moveHeuristic;
      }
    }
    
    return { score: bestScore, move: bestMove };
  } else {
    // Minimizing: opponent's turn
    let bestScore = Infinity;
    
    for (const move of sortedMoves) {
      const newBoard = makeMove(board, move, getOpponent(player));
      if (!newBoard) continue;
      
      const result = minimax(
        newBoard,
        player,
        depth,
        true,
        currentDepth + 1
      );
      
      if (result.score < bestScore) {
        bestScore = result.score;
      }
    }
    
    return { score: bestScore, move: null }; // No move in minimizing branch
  }
}

/**
 * Gets the best move for an AI player based on difficulty
 * @param board - Current board state
 * @param player - AI player ("X" or "O")
 * @param difficulty - AI difficulty level ("easy" | "medium" | "hard")
 * @returns The index of the best move, or null if no moves available
 */
export function getBestMove(
  board: Board,
  player: "X" | "O",
  difficulty: Difficulty = "medium"
): number | null {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return null; // No moves available
  }
  
  // Easy: random move
  if (difficulty === "easy") {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }
  
  // Medium: shallow minimax (depth 2)
  if (difficulty === "medium") {
    const result = minimax(board, player, 2, true);
    return result.move;
  }
  
  // Hard: full minimax (depth 9 for complete game tree)
  if (difficulty === "hard") {
    const result = minimax(board, player, 9, true);
    return result.move;
  }
  
  // Fallback to medium
  const result = minimax(board, player, 2, true);
  return result.move;
}


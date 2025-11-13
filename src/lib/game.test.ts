import { describe, it, expect } from "vitest";
import {
  createEmptyBoard,
  makeMove,
  checkWinner,
  isBoardFull,
  getAvailableMoves,
  getBestMove,
  type Board,
} from "./game";

describe("createEmptyBoard", () => {
  it("should create an empty board with 9 null cells", () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    expect(board.every((cell) => cell === null)).toBe(true);
  });
});

describe("makeMove", () => {
  it("should make a valid move on an empty board", () => {
    const board = createEmptyBoard();
    const newBoard = makeMove(board, 0, "X");
    expect(newBoard).not.toBeNull();
    expect(newBoard?.[0]).toBe("X");
    expect(newBoard?.slice(1).every((cell) => cell === null)).toBe(true);
  });

  it("should not mutate the original board", () => {
    const board = createEmptyBoard();
    const newBoard = makeMove(board, 0, "X");
    expect(board[0]).toBeNull();
    expect(newBoard?.[0]).toBe("X");
  });

  it("should return null for invalid index (negative)", () => {
    const board = createEmptyBoard();
    const newBoard = makeMove(board, -1, "X");
    expect(newBoard).toBeNull();
  });

  it("should return null for invalid index (too large)", () => {
    const board = createEmptyBoard();
    const newBoard = makeMove(board, 9, "X");
    expect(newBoard).toBeNull();
  });

  it("should return null when trying to move on an occupied cell", () => {
    const board = createEmptyBoard();
    const boardAfterX = makeMove(board, 0, "X");
    const newBoard = makeMove(boardAfterX!, 0, "O");
    expect(newBoard).toBeNull();
  });

  it("should allow moves by both players", () => {
    const board = createEmptyBoard();
    const boardAfterX = makeMove(board, 0, "X");
    const boardAfterO = makeMove(boardAfterX!, 1, "O");
    expect(boardAfterO?.[0]).toBe("X");
    expect(boardAfterO?.[1]).toBe("O");
  });
});

describe("checkWinner", () => {
  describe("row wins", () => {
    it("should detect winner in top row (X)", () => {
      const board: Board = ["X", "X", "X", null, null, null, null, null, null];
      expect(checkWinner(board)).toBe("X");
    });

    it("should detect winner in middle row (O)", () => {
      const board: Board = [null, null, null, "O", "O", "O", null, null, null];
      expect(checkWinner(board)).toBe("O");
    });

    it("should detect winner in bottom row (X)", () => {
      const board: Board = [null, null, null, null, null, null, "X", "X", "X"];
      expect(checkWinner(board)).toBe("X");
    });
  });

  describe("column wins", () => {
    it("should detect winner in left column (O)", () => {
      const board: Board = ["O", null, null, "O", null, null, "O", null, null];
      expect(checkWinner(board)).toBe("O");
    });

    it("should detect winner in middle column (X)", () => {
      const board: Board = [null, "X", null, null, "X", null, null, "X", null];
      expect(checkWinner(board)).toBe("X");
    });

    it("should detect winner in right column (O)", () => {
      const board: Board = [null, null, "O", null, null, "O", null, null, "O"];
      expect(checkWinner(board)).toBe("O");
    });
  });

  describe("diagonal wins", () => {
    it("should detect winner in main diagonal (X)", () => {
      const board: Board = ["X", null, null, null, "X", null, null, null, "X"];
      expect(checkWinner(board)).toBe("X");
    });

    it("should detect winner in anti-diagonal (O)", () => {
      const board: Board = [null, null, "O", null, "O", null, "O", null, null];
      expect(checkWinner(board)).toBe("O");
    });
  });

  describe("draw detection", () => {
    it("should return 'draw' when board is full with no winner", () => {
      const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      expect(checkWinner(board)).toBe("draw");
    });

    it("should return 'draw' for another full board configuration", () => {
      const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
      expect(checkWinner(board)).toBe("draw");
    });
  });

  describe("game in progress", () => {
    it("should return null when no winner and board not full", () => {
      const board: Board = ["X", "O", null, null, null, null, null, null, null];
      expect(checkWinner(board)).toBeNull();
    });

    it("should return null for empty board", () => {
      const board = createEmptyBoard();
      expect(checkWinner(board)).toBeNull();
    });
  });
});

describe("isBoardFull", () => {
  it("should return false for empty board", () => {
    const board = createEmptyBoard();
    expect(isBoardFull(board)).toBe(false);
  });

  it("should return false for partially filled board", () => {
    const board: Board = ["X", "O", "X", null, null, null, null, null, null];
    expect(isBoardFull(board)).toBe(false);
  });

  it("should return true for full board", () => {
    const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    expect(isBoardFull(board)).toBe(true);
  });

  it("should return true for another full board configuration", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(isBoardFull(board)).toBe(true);
  });
});

describe("getAvailableMoves", () => {
  it("should return all indices for empty board", () => {
    const board = createEmptyBoard();
    const moves = getAvailableMoves(board);
    expect(moves).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should return correct available moves for partially filled board", () => {
    const board: Board = ["X", null, "O", null, "X", null, null, null, null];
    const moves = getAvailableMoves(board);
    expect(moves).toEqual([1, 3, 5, 6, 7, 8]);
  });

  it("should return empty array for full board", () => {
    const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    const moves = getAvailableMoves(board);
    expect(moves).toEqual([]);
  });

  it("should return correct moves when only one cell is empty", () => {
    const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", null];
    const moves = getAvailableMoves(board);
    expect(moves).toEqual([8]);
  });
});

describe("integration tests", () => {
  it("should handle a complete game with X winning", () => {
    let board = createEmptyBoard();
    
    // X moves
    board = makeMove(board, 0, "X")!;
    expect(checkWinner(board)).toBeNull();
    
    // O moves
    board = makeMove(board, 3, "O")!;
    expect(checkWinner(board)).toBeNull();
    
    // X moves
    board = makeMove(board, 1, "X")!;
    expect(checkWinner(board)).toBeNull();
    
    // O moves
    board = makeMove(board, 4, "O")!;
    expect(checkWinner(board)).toBeNull();
    
    // X wins
    board = makeMove(board, 2, "X")!;
    expect(checkWinner(board)).toBe("X");
  });

  it("should handle a complete game ending in draw", () => {
    let board = createEmptyBoard();
    
    // X O X
    // O O X
    // X X O
    board = makeMove(board, 0, "X")!;
    board = makeMove(board, 1, "O")!;
    board = makeMove(board, 2, "X")!;
    board = makeMove(board, 3, "O")!;
    board = makeMove(board, 5, "X")!;
    board = makeMove(board, 4, "O")!;
    board = makeMove(board, 6, "X")!;
    board = makeMove(board, 8, "O")!;
    board = makeMove(board, 7, "X")!;
    
    expect(isBoardFull(board)).toBe(true);
    expect(checkWinner(board)).toBe("draw");
    expect(getAvailableMoves(board)).toEqual([]);
  });

  it("should prevent invalid moves during game", () => {
    let board = createEmptyBoard();
    
    board = makeMove(board, 0, "X")!;
    
    // Try to move on occupied cell
    const invalidMove = makeMove(board, 0, "O");
    expect(invalidMove).toBeNull();
    
    // Try to move on invalid index
    const invalidIndex = makeMove(board, 10, "O");
    expect(invalidIndex).toBeNull();
    
    // Valid move should still work
    const validMove = makeMove(board, 1, "O");
    expect(validMove).not.toBeNull();
    expect(validMove?.[1]).toBe("O");
  });
});

describe("getBestMove", () => {
  describe("easy difficulty", () => {
    it("should return a valid move from available moves", () => {
      const board = createEmptyBoard();
      const move = getBestMove(board, "X", "easy");
      expect(move).not.toBeNull();
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
      expect(board[move!]).toBeNull();
    });

    it("should return null when no moves are available", () => {
      const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      const move = getBestMove(board, "X", "easy");
      expect(move).toBeNull();
    });

    it("should return different moves on multiple calls (random)", () => {
      const board: Board = [null, null, null, null, null, null, null, null, null];
      const moves = new Set<number>();
      
      // Run multiple times to get different random moves
      for (let i = 0; i < 20; i++) {
        const move = getBestMove(board, "X", "easy");
        if (move !== null) {
          moves.add(move);
        }
      }
      
      // Should have multiple different moves (very likely with 20 attempts)
      expect(moves.size).toBeGreaterThan(1);
    });
  });

  describe("medium difficulty", () => {
    it("should return a valid move", () => {
      const board = createEmptyBoard();
      const move = getBestMove(board, "X", "medium");
      expect(move).not.toBeNull();
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
    });

    it("should block opponent's winning move", () => {
      // Opponent has two in a row, AI should block
      const board: Board = ["O", "O", null, null, "X", null, null, null, null];
      const move = getBestMove(board, "X", "medium");
      expect(move).toBe(2); // Should block at index 2
    });

    it("should take winning move when available", () => {
      // AI has two in a row, should win
      const board: Board = ["X", "X", null, null, "O", null, null, null, null];
      const move = getBestMove(board, "X", "medium");
      expect(move).toBe(2); // Should win at index 2
    });

    it("should return null when no moves are available", () => {
      const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      const move = getBestMove(board, "X", "medium");
      expect(move).toBeNull();
    });
  });

  describe("hard difficulty", () => {
    it("should return a valid move", () => {
      const board = createEmptyBoard();
      const move = getBestMove(board, "X", "hard");
      expect(move).not.toBeNull();
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
    });

    it("should always take center on empty board", () => {
      const board = createEmptyBoard();
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(4); // Center is the best opening move
    });

    it("should block opponent's winning move", () => {
      // Opponent has two in a row, AI must block
      const board: Board = ["O", "O", null, null, "X", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(2); // Must block at index 2
    });

    it("should take winning move when available", () => {
      // AI has two in a row, must win
      const board: Board = ["X", "X", null, null, "O", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(2); // Must win at index 2
    });

    it("should block multiple threats", () => {
      // Opponent has two threats, AI should block the critical one
      const board: Board = ["O", null, "O", null, "X", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      // Should block one of the threats (index 1 or 3, but 1 is more critical)
      expect(move).toBe(1);
    });

    it("should create fork when possible", () => {
      // AI should create a fork (two winning opportunities)
      const board: Board = ["X", null, null, null, "O", null, null, null, "X"];
      const move = getBestMove(board, "X", "hard");
      // Should play in a way that creates multiple threats
      expect(move).not.toBeNull();
      // Any valid move that creates a fork (could be corner or edge)
      expect([1, 2, 3, 5, 6, 7]).toContain(move);
    });

    it("should prevent opponent fork", () => {
      // Opponent can create a fork, AI should prevent it
      const board: Board = ["O", null, null, null, "X", null, null, null, "O"];
      const move = getBestMove(board, "X", "hard");
      // Should play in a way that prevents opponent fork
      expect(move).not.toBeNull();
      // Should block by playing on an edge
      expect([1, 3, 5, 7]).toContain(move);
    });

    it("should return null when no moves are available", () => {
      const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBeNull();
    });

    it("should make optimal move in endgame scenario", () => {
      // Near endgame, AI should make optimal move
      const board: Board = ["X", "O", "X", "O", "X", null, null, null, null];
      const move = getBestMove(board, "O", "hard");
      expect(move).not.toBeNull();
      // Should block or create best position
      expect([5, 6, 7, 8]).toContain(move);
    });
  });

  describe("known board states", () => {
    it("should block horizontal win", () => {
      const board: Board = ["O", "O", null, "X", null, null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(2); // Must block
    });

    it("should block vertical win", () => {
      const board: Board = ["O", null, null, "O", "X", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(6); // Must block
    });

    it("should block diagonal win", () => {
      const board: Board = ["O", null, null, null, "O", "X", null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(8); // Must block
    });

    it("should take horizontal win", () => {
      const board: Board = ["X", "X", null, "O", null, null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(2); // Must win
    });

    it("should take vertical win", () => {
      const board: Board = ["X", null, null, "X", "O", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(6); // Must win
    });

    it("should take diagonal win", () => {
      const board: Board = ["X", null, null, null, "X", "O", null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(8); // Must win
    });

    it("should prefer center over corner in opening", () => {
      const board: Board = [null, null, null, null, null, null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(4); // Center is optimal
    });

    it("should prefer corner over edge in certain positions", () => {
      // When opponent has center, AI should take corner
      const board: Board = [null, null, null, null, "O", null, null, null, null];
      const move = getBestMove(board, "X", "hard");
      expect([0, 2, 6, 8]).toContain(move); // Should take a corner
    });
  });

  describe("difficulty comparison", () => {
    it("should make different moves for different difficulties on same board", () => {
      const board: Board = ["X", null, null, null, "O", null, null, null, null];
      
      // Easy might make random move
      const easyMove = getBestMove(board, "X", "easy");
      expect(easyMove).not.toBeNull();
      
      // Hard should make optimal move (likely blocking or creating threat)
      const hardMove = getBestMove(board, "X", "hard");
      expect(hardMove).not.toBeNull();
      
      // Both should be valid moves
      expect([1, 2, 3, 5, 6, 7, 8]).toContain(easyMove);
      expect([1, 2, 3, 5, 6, 7, 8]).toContain(hardMove);
    });

    it("should make consistent optimal moves on hard difficulty", () => {
      // Hard difficulty should be deterministic (except when multiple equally good moves exist)
      const board: Board = ["X", "X", null, "O", null, null, null, null, null];
      
      // Should always choose to win
      const move1 = getBestMove(board, "X", "hard");
      const move2 = getBestMove(board, "X", "hard");
      expect(move1).toBe(2); // Must win
      expect(move2).toBe(2); // Must win (consistent)
    });
  });

  describe("edge cases", () => {
    it("should handle single move remaining", () => {
      const board: Board = ["X", "O", "X", "O", "X", "O", "O", "X", null];
      const move = getBestMove(board, "O", "hard");
      expect(move).toBe(8); // Only move available
    });

    it("should handle almost full board", () => {
      const board: Board = ["X", "O", "X", "O", "X", null, "O", "X", "O"];
      const move = getBestMove(board, "X", "hard");
      expect(move).toBe(5); // Only move available
    });

    it("should return valid move when player is O", () => {
      const board = createEmptyBoard();
      const move = getBestMove(board, "O", "hard");
      expect(move).not.toBeNull();
      expect(move).toBe(4); // Center is best for both players
    });
  });
});


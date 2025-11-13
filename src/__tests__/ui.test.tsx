import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board, Header, Controls } from "@/src/components";
import {
  createEmptyBoard,
  makeMove,
  checkWinner,
  getWinningCells,
  type Board as BoardType,
  type Player,
  type Difficulty,
} from "@/src/lib/game";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => {
  const React = require("react");
  const { forwardRef } = React;
  
  // Filter out framer-motion specific props
  const filterProps = (props: any) => {
    const {
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      whileFocus,
      whileDrag,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      layout,
      layoutId,
      layoutDependency,
      layoutScroll,
      layoutRoot,
      onAnimationStart,
      onAnimationComplete,
      onUpdate,
      onHoverStart,
      onHoverEnd,
      onTapStart,
      onTap,
      onTapCancel,
      onDragStart,
      onDrag,
      onDragEnd,
      onPanStart,
      onPan,
      onPanEnd,
      ...rest
    } = props;
    return rest;
  };
  
  return {
    motion: {
      div: forwardRef(({ children, ...props }: any, ref: any) => (
        <div ref={ref} {...filterProps(props)}>{children}</div>
      )),
      button: forwardRef(({ children, ...props }: any, ref: any) => (
        <button ref={ref} {...filterProps(props)}>{children}</button>
      )),
      header: forwardRef(({ children, ...props }: any, ref: any) => (
        <header ref={ref} {...filterProps(props)}>{children}</header>
      )),
      span: forwardRef(({ children, ...props }: any, ref: any) => (
        <span ref={ref} {...filterProps(props)}>{children}</span>
      )),
      p: forwardRef(({ children, ...props }: any, ref: any) => (
        <p ref={ref} {...filterProps(props)}>{children}</p>
      )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe("Board Component", () => {
  it("renders an empty board with 9 squares", () => {
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares).toHaveLength(9);
  });

  it("calls onSquareClick when a square is clicked", async () => {
    const user = userEvent.setup();
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    await user.click(squares[0]);

    expect(handleSquareClick).toHaveBeenCalledWith(0);
  });

  it("displays X and O values correctly", () => {
    const board: BoardType = ["X", "O", null, null, "X", null, null, null, "O"];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const xValues = screen.getAllByText("X");
    const oValues = screen.getAllByText("O");
    expect(xValues).toHaveLength(2);
    expect(oValues).toHaveLength(2);
  });

  it("disables squares when disabled prop is true", () => {
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={true}
      />
    );

    const squares = screen.getAllByRole("button");
    squares.forEach((square) => {
      expect(square).toBeDisabled();
    });
  });

  it("disables occupied squares", () => {
    const board: BoardType = ["X", null, null, null, null, null, null, null, null];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares[0]).toBeDisabled();
    expect(squares[1]).not.toBeDisabled();
  });

  it("highlights winning cells", () => {
    const board: BoardType = ["X", "X", "X", null, "O", null, null, "O", null];
    const winningCells = [0, 1, 2];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={winningCells}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    // Check that winning cells have the winning aria-label
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[2]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
  });

  it("has proper aria-labels for accessibility", () => {
    const board: BoardType = ["X", null, "O", null, null, null, null, null, null];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("Row 1, Column 1"));
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("X"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("Row 1, Column 2"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("empty"));
  });

  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup();
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    
    // Focus first square
    squares[0].focus();
    expect(document.activeElement).toBe(squares[0]);

    // Press right arrow
    fireEvent.keyDown(squares[0], { key: "ArrowRight" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[1]);
    });

    // Press down arrow
    fireEvent.keyDown(squares[1], { key: "ArrowDown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[4]);
    });

    // Press left arrow
    fireEvent.keyDown(squares[4], { key: "ArrowLeft" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[3]);
    });

    // Press up arrow
    fireEvent.keyDown(squares[3], { key: "ArrowUp" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[0]);
    });

    // Test Home key (first column of row)
    fireEvent.keyDown(squares[4], { key: "Home" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[3]);
    });

    // Test End key (last column of row)
    fireEvent.keyDown(squares[3], { key: "End" });
    await waitFor(() => {
      expect(document.activeElement).toBe(squares[5]);
    });
  });
});

describe("Header Component", () => {
  it("displays game title", () => {
    render(<Header gameMode="2P" currentPlayer={null} winner={null} />);
    // Check for the h1 title specifically
    const title = screen.getByRole("heading", { name: /tic tac toe/i });
    expect(title).toBeInTheDocument();
  });

  it("displays current player's turn", () => {
    render(<Header gameMode="2P" currentPlayer="X" winner={null} />);
    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  it("displays winner message", () => {
    render(<Header gameMode="2P" currentPlayer={null} winner="X" />);
    expect(screen.getByText("Player X wins!")).toBeInTheDocument();
  });

  it("displays draw message", () => {
    render(<Header gameMode="2P" currentPlayer={null} winner="draw" />);
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
  });

  it("displays AI thinking message in 1P mode", () => {
    render(<Header gameMode="1P" currentPlayer="O" winner={null} difficulty="medium" />);
    expect(screen.getByText(/AI thinking/)).toBeInTheDocument();
  });

  it("displays game mode", () => {
    render(<Header gameMode="1P" currentPlayer={null} winner={null} difficulty="medium" />);
    expect(screen.getByText("Mode:")).toBeInTheDocument();
    expect(screen.getByText("1P")).toBeInTheDocument();
  });

  it("has aria-live region for status announcements", () => {
    const { rerender } = render(<Header gameMode="2P" currentPlayer="X" winner={null} />);
    let status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");
    expect(status).toHaveTextContent("Player X's turn");
    
    // Test that status updates are announced
    rerender(<Header gameMode="2P" currentPlayer={null} winner="X" />);
    status = screen.getByRole("status");
    expect(status).toHaveTextContent("Player X wins!");
  });

  it("has accessible game mode labels", () => {
    render(<Header gameMode="1P" currentPlayer={null} winner={null} difficulty="medium" />);
    const modeLabel = screen.getByLabelText(/Game mode: 1 player/i);
    expect(modeLabel).toBeInTheDocument();
    
    const difficultyLabel = screen.getByLabelText(/Difficulty: medium/i);
    expect(difficultyLabel).toBeInTheDocument();
  });
});

describe("Controls Component", () => {
  it("renders New Game button", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="2P"
        difficulty="medium"
        disabled={false}
      />
    );

    expect(screen.getByRole("button", { name: /new game/i })).toBeInTheDocument();
  });

  it("calls onNewGame when New Game button is clicked", async () => {
    const user = userEvent.setup();
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="2P"
        difficulty="medium"
        disabled={false}
      />
    );

    const newGameButton = screen.getByRole("button", { name: /new game/i });
    await user.click(newGameButton);

    expect(onNewGame).toHaveBeenCalledTimes(1);
  });

  it("calls onModeToggle when mode button is clicked", async () => {
    const user = userEvent.setup();
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="2P"
        difficulty="medium"
        disabled={false}
      />
    );

    const modeButton = screen.getByRole("button", { name: /switch to.*mode/i });
    await user.click(modeButton);

    expect(onModeToggle).toHaveBeenCalledTimes(1);
  });

  it("displays difficulty buttons in 1P mode", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="medium"
        disabled={false}
      />
    );

    expect(screen.getByRole("button", { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hard/i })).toBeInTheDocument();
  });

  it("calls onDifficultyChange when difficulty button is clicked", async () => {
    const user = userEvent.setup();
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="medium"
        disabled={false}
      />
    );

    const hardButton = screen.getByRole("button", { name: /hard/i });
    await user.click(hardButton);

    expect(onDifficultyChange).toHaveBeenCalledWith("hard");
  });

  it("has proper aria-labels for accessibility", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="medium"
        disabled={false}
      />
    );

    expect(screen.getByRole("button", { name: /start a new game/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to.*mode/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set difficulty to easy/i })).toBeInTheDocument();
  });
});

describe("Full Game Flow - Player vs Player", () => {
  it("plays a complete game and detects winner", async () => {
    const user = userEvent.setup();
    let board = createEmptyBoard();
    let currentPlayer: Player = "X";
    let winner: Player | "draw" | null = null;
    let winningCells: number[] = [];

    const handleSquareClick = (index: number) => {
      const newBoard = makeMove(board, index, currentPlayer);
      if (newBoard) {
        board = [...newBoard]; // Create new array reference
        const gameWinner = checkWinner(board);
        winner = gameWinner;
        if (gameWinner && gameWinner !== "draw") {
          winningCells = getWinningCells(board);
        } else {
          winningCells = [];
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    };

    const TestGame = () => {
      return (
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningCells={winningCells}
          disabled={!!winner}
        />
      );
    };

    const { rerender } = render(<TestGame />);

    // Player X: Top row
    let squares = screen.getAllByRole("button");
    await user.click(squares[0]); // X at 0
    rerender(<TestGame />);

    squares = screen.getAllByRole("button");
    await user.click(squares[3]); // O at 3 (bottom-left, not interfering)
    rerender(<TestGame />);

    squares = screen.getAllByRole("button");
    await user.click(squares[1]); // X at 1
    rerender(<TestGame />);

    squares = screen.getAllByRole("button");
    await user.click(squares[4]); // O at 4 (center, not interfering)
    rerender(<TestGame />);

    squares = screen.getAllByRole("button");
    await user.click(squares[2]); // X at 2 - should win (top row: 0, 1, 2)
    rerender(<TestGame />);

    await waitFor(() => {
      expect(winner).toBe("X");
      expect(winningCells).toEqual([0, 1, 2]);
    });

    // Check that winning cells are highlighted
    squares = screen.getAllByRole("button");
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[2]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
  });

  it("detects a draw game", async () => {
    const user = userEvent.setup();
    let board = createEmptyBoard();
    let currentPlayer: Player = "X";
    let winner: Player | "draw" | null = null;

    const handleSquareClick = vi.fn((index: number) => {
      const newBoard = makeMove(board, index, currentPlayer);
      if (newBoard) {
        board = newBoard;
        winner = checkWinner(board);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });

    const { rerender } = render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={!!winner}
      />
    );

    // Play a draw game
    // X O X
    // O O X
    // X X O
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // X, O, X, O, O, X, X, X, O

    for (const index of moves) {
      const squares = screen.getAllByRole("button");
      await user.click(squares[index]);
      rerender(
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningCells={[]}
          disabled={!!winner}
        />
      );
    }

    await waitFor(() => {
      expect(winner).toBe("draw");
    });
  });

  it("resets the board correctly", async () => {
    const user = userEvent.setup();
    let board: BoardType = ["X", "X", "X", null, null, null, null, null, null];
    let winner: Player | "draw" | null = "X";
    let winningCells: number[] = [0, 1, 2];

    const handleSquareClick = vi.fn();
    const handleNewGame = vi.fn(() => {
      board = createEmptyBoard();
      winner = null;
      winningCells = [];
    });

    const { rerender } = render(
      <>
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningCells={winningCells}
          disabled={!!winner}
        />
        <Controls
          onNewGame={handleNewGame}
          onModeToggle={vi.fn()}
          onDifficultyChange={vi.fn()}
          gameMode="2P"
          difficulty="medium"
          disabled={false}
        />
      </>
    );

    // Verify board has X values
    expect(screen.getAllByText("X")).toHaveLength(3);

    // Click New Game
    const newGameButton = screen.getByRole("button", { name: /new game/i });
    await user.click(newGameButton);

    // Reset state
    handleNewGame();

    rerender(
      <>
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningCells={winningCells}
          disabled={!!winner}
        />
        <Controls
          onNewGame={handleNewGame}
          onModeToggle={vi.fn()}
          onDifficultyChange={vi.fn()}
          gameMode="2P"
          difficulty="medium"
          disabled={false}
        />
      </>
    );

    // Verify board is empty
    expect(screen.queryByText("X")).not.toBeInTheDocument();
    expect(screen.queryByText("O")).not.toBeInTheDocument();

    // Verify all squares are enabled
    const squares = screen.getAllByRole("button");
    squares.forEach((square) => {
      expect(square).not.toBeDisabled();
    });
  });
});

describe("Full Game Flow - Player vs AI", () => {
  it("allows player to make moves in 1P mode", async () => {
    const user = userEvent.setup();
    let board = createEmptyBoard();
    let currentPlayer: Player = "X";

    const handleSquareClick = vi.fn((index: number) => {
      const newBoard = makeMove(board, index, currentPlayer);
      if (newBoard) {
        board = newBoard;
        currentPlayer = "O"; // AI's turn (but we won't simulate AI here)
      }
    });

    const { rerender } = render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    // Player makes a move
    const squares = screen.getAllByRole("button");
    await user.click(squares[4]); // Center square

    rerender(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    // Verify X was placed
    expect(screen.getByText("X")).toBeInTheDocument();

    // Verify the square is now disabled
    expect(squares[4]).toBeDisabled();
  });

  it("disables player moves during AI turn", () => {
    const board: BoardType = ["X", null, null, null, null, null, null, null, null];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={true} // AI is thinking
      />
    );

    const squares = screen.getAllByRole("button");
    squares.forEach((square) => {
      expect(square).toBeDisabled();
    });
  });
});

describe("Accessibility", () => {
  it("has proper ARIA labels on all squares", () => {
    const board: BoardType = ["X", null, "O", null, "X", null, null, null, null];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("Row 1, Column 1"));
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("X"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("empty"));
    expect(squares[2]).toHaveAttribute("aria-label", expect.stringContaining("O"));
  });

  it("has proper role attributes", () => {
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    // Check board has grid role
    const grid = screen.getByRole("grid");
    expect(grid).toHaveAttribute("aria-label", "Tic Tac Toe board");

    // Check rowgroup role
    const rowgroup = screen.getByRole("rowgroup");
    expect(rowgroup).toBeInTheDocument();

    // Check gridcell roles
    const gridcells = screen.getAllByRole("gridcell");
    expect(gridcells).toHaveLength(9);

    // Check squares have button role
    const squares = screen.getAllByRole("button");
    expect(squares).toHaveLength(9);
  });

  it("has proper aria-rowindex and aria-colindex attributes", () => {
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const gridcells = screen.getAllByRole("gridcell");
    
    // Check first row
    expect(gridcells[0]).toHaveAttribute("aria-rowindex", "1");
    expect(gridcells[0]).toHaveAttribute("aria-colindex", "1");
    expect(gridcells[1]).toHaveAttribute("aria-rowindex", "1");
    expect(gridcells[1]).toHaveAttribute("aria-colindex", "2");
    expect(gridcells[2]).toHaveAttribute("aria-rowindex", "1");
    expect(gridcells[2]).toHaveAttribute("aria-colindex", "3");
    
    // Check second row
    expect(gridcells[3]).toHaveAttribute("aria-rowindex", "2");
    expect(gridcells[3]).toHaveAttribute("aria-colindex", "1");
  });

  it("has aria-disabled on disabled squares", () => {
    const board: BoardType = ["X", null, null, null, null, null, null, null, null];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares[0]).toHaveAttribute("aria-disabled", "true");
    expect(squares[1]).toHaveAttribute("aria-disabled", "false");
  });

  it("has winning cells marked in aria-label", () => {
    const board: BoardType = ["X", "X", "X", null, "O", null, null, "O", null];
    const winningCells = [0, 1, 2];
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={winningCells}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    expect(squares[0]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[1]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[2]).toHaveAttribute("aria-label", expect.stringContaining("winning"));
    expect(squares[3]).not.toHaveAttribute("aria-label", expect.stringContaining("winning"));
  });

  it("supports keyboard navigation with Enter and Space", async () => {
    const user = userEvent.setup();
    const board = createEmptyBoard();
    const handleSquareClick = vi.fn();

    render(
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningCells={[]}
        disabled={false}
      />
    );

    const squares = screen.getAllByRole("button");
    squares[0].focus();

    // Press Enter
    fireEvent.keyDown(squares[0], { key: "Enter" });
    expect(handleSquareClick).toHaveBeenCalled();

    // Press Space on another square
    squares[1].focus();
    fireEvent.keyDown(squares[1], { key: " " });
    expect(handleSquareClick).toHaveBeenCalledTimes(2);
  });

  it("has proper aria-labels on control buttons", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="medium"
        disabled={false}
      />
    );

    expect(screen.getByRole("button", { name: /start a new game/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to.*mode/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set difficulty to easy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set difficulty to medium/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set difficulty to hard/i })).toBeInTheDocument();
  });

  it("has aria-pressed on toggle buttons", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    const { rerender } = render(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="medium"
        disabled={false}
      />
    );

    const modeButton = screen.getByRole("button", { name: /switch to.*mode/i });
    expect(modeButton).toHaveAttribute("aria-pressed", "true");

    const mediumButton = screen.getByRole("button", { name: /set difficulty to medium/i });
    expect(mediumButton).toHaveAttribute("aria-pressed", "true");

    // Change difficulty
    rerender(
      <Controls
        onNewGame={onNewGame}
        onModeToggle={onModeToggle}
        onDifficultyChange={onDifficultyChange}
        gameMode="1P"
        difficulty="hard"
        disabled={false}
      />
    );

    const hardButton = screen.getByRole("button", { name: /set difficulty to hard/i });
    expect(hardButton).toHaveAttribute("aria-pressed", "true");
    const updatedMediumButton = screen.getByRole("button", { name: /set difficulty to medium/i });
    expect(updatedMediumButton).toHaveAttribute("aria-pressed", "false");
  });

  it("has aria-hidden on decorative icons", () => {
    const onNewGame = vi.fn();
    const onModeToggle = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <>
        <Controls
          onNewGame={onNewGame}
          onModeToggle={onModeToggle}
          onDifficultyChange={onDifficultyChange}
          gameMode="1P"
          difficulty="medium"
          disabled={false}
        />
        <Header gameMode="1P" currentPlayer={null} winner={null} difficulty="medium" />
      </>
    );

    // Icons should be hidden from screen readers
    const icons = document.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });
});


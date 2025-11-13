import { describe, it, expect, beforeEach, vi } from "vitest";
import { RealtimeGame } from "../lib/realtime";
import type { Board } from "../lib/game";

// Mock Supabase
vi.mock("../lib/supabase", () => {
  const mockChannel = {
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockResolvedValue("SUBSCRIBED"),
    send: vi.fn().mockResolvedValue({ error: null }),
    unsubscribe: vi.fn(),
  };

  const mockSupabase = {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { code: "PGRST116" },
          }),
        }),
      }),
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: {
              id: "test-room",
              player_x_id: "player1",
              player_o_id: null,
              board: '["null","null","null","null","null","null","null","null","null"]',
              current_player: "X",
              winner: null,
              status: "waiting",
            },
            error: null,
          }),
        }),
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: "test-room",
                player_x_id: "player1",
                player_o_id: "player2",
                board: '["X","null","null","null","null","null","null","null","null"]',
                current_player: "O",
                winner: null,
                status: "playing",
              },
              error: null,
            }),
          }),
        }),
      }),
    }),
    channel: vi.fn().mockReturnValue(mockChannel),
  };

  return {
    supabase: mockSupabase,
  };
});

// Mock fetch for API calls
global.fetch = vi.fn();

describe("RealtimeGame", () => {
  const roomId = "test-room-123";
  const playerId = "player-123";
  let callbacks: {
    onMove?: (board: Board, currentPlayer: "X" | "O" | null, winner: "X" | "O" | "draw" | null, winningCells: number[]) => void;
    onOpponentJoin?: (opponentId: string) => void;
    onOpponentLeave?: () => void;
    onGameReset?: () => void;
    onConnectionChange?: (status: string) => void;
    onOpponentStatusChange?: (status: string) => void;
  };

  beforeEach(() => {
    callbacks = {
      onMove: vi.fn(),
      onOpponentJoin: vi.fn(),
      onOpponentLeave: vi.fn(),
      onGameReset: vi.fn(),
      onConnectionChange: vi.fn(),
      onOpponentStatusChange: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("Room Creation", () => {
    it("should create a room when joining a non-existent room", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: roomId,
          player_x_id: playerId,
          player_o_id: null,
          board: '["null","null","null","null","null","null","null","null","null"]',
          current_player: "X",
          winner: null,
          status: "waiting",
        }),
      });

      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      const result = await realtime.joinRoom();

      expect(result.success).toBe(true);
      expect(result.playerRole).toBe("X");
      expect(realtime.getPlayerRole()).toBe("X");
    });

    it("should join an existing room as player O", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: roomId,
          player_x_id: "player1",
          player_o_id: playerId,
          board: '["null","null","null","null","null","null","null","null","null"]',
          current_player: "X",
          winner: null,
          status: "playing",
        }),
      });

      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      const result = await realtime.joinRoom();

      expect(result.success).toBe(true);
      expect(result.playerRole).toBe("O");
      expect(realtime.getPlayerRole()).toBe("O");
    });
  });

  describe("Move Handling", () => {
    it("should prevent moves when it's not the player's turn", async () => {
      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      // Mock player role as O
      (realtime as any).playerRole = "O";
      
      const board: Board = ["X", null, null, null, null, null, null, null, null];
      const result = await realtime.makeMove(1, board, "X"); // Trying to move when it's X's turn

      expect(result).toBe(false);
    });

    it("should allow valid moves on player's turn", async () => {
      const { supabase } = await import("../lib/supabase");
      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      (realtime as any).playerRole = "X";
      (realtime as any).channel = supabase.channel("test");

      const board: Board = [null, null, null, null, null, null, null, null, null];
      const result = await realtime.makeMove(0, board, "X");

      expect(result).toBe(true);
      expect(supabase.from("rooms").update).toHaveBeenCalled();
    });
  });

  describe("Game Reset", () => {
    it("should reset the game state", async () => {
      const { supabase } = await import("../lib/supabase");
      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      (realtime as any).channel = supabase.channel("test");

      const result = await realtime.resetGame();

      expect(result).toBe(true);
      expect(supabase.from("rooms").update).toHaveBeenCalled();
      expect(callbacks.onGameReset).toHaveBeenCalled();
    });
  });

  describe("Connection Management", () => {
    it("should handle disconnection", () => {
      const realtime = new RealtimeGame(roomId, playerId, callbacks);
      const mockChannel = {
        unsubscribe: vi.fn(),
      };
      (realtime as any).channel = mockChannel;
      (realtime as any).roomSubscription = mockChannel;

      realtime.disconnect();

      expect(mockChannel.unsubscribe).toHaveBeenCalledTimes(2);
      expect(callbacks.onConnectionChange).toHaveBeenCalledWith("disconnected");
    });
  });
});


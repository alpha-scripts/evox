import { supabase, type Room } from "./supabase";
import type { Board, Player } from "./game";
import { makeMove, checkWinner, getWinningCells } from "./game";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";
export type OpponentStatus = "waiting" | "connected" | "disconnected";

export interface RealtimeCallbacks {
  onMove?: (board: Board, currentPlayer: Player, winner: Player | "draw" | null, winningCells: number[]) => void;
  onOpponentJoin?: (opponentId: string) => void;
  onOpponentLeave?: () => void;
  onGameReset?: () => void;
  onConnectionChange?: (status: ConnectionStatus) => void;
  onOpponentStatusChange?: (status: OpponentStatus) => void;
}

export class RealtimeGame {
  private roomId: string;
  private playerId: string;
  private playerRole: "X" | "O" | null = null;
  private callbacks: RealtimeCallbacks;
  private channel: ReturnType<typeof supabase.channel> | null = null;
  private roomSubscription: ReturnType<typeof supabase.channel> | null = null;

  constructor(roomId: string, playerId: string, callbacks: RealtimeCallbacks) {
    this.roomId = roomId;
    this.playerId = playerId;
    this.callbacks = callbacks;
  }

  async connect(): Promise<void> {
    try {
      this.callbacks.onConnectionChange?.("connecting");

      // Subscribe to room changes
      this.roomSubscription = supabase
        .channel(`room:${this.roomId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rooms",
            filter: `id=eq.${this.roomId}`,
          },
          (payload) => {
            this.handleRoomUpdate(payload.new as Room);
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            this.callbacks.onConnectionChange?.("connected");
          } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
            this.callbacks.onConnectionChange?.("error");
          }
        });

      // Subscribe to moves channel
      this.channel = supabase
        .channel(`moves:${this.roomId}`)
        .on(
          "broadcast",
          { event: "move" },
          (payload) => {
            if (payload.payload.playerId !== this.playerId) {
              this.handleMove(payload.payload);
            }
          }
        )
        .on(
          "broadcast",
          { event: "reset" },
          () => {
            this.callbacks.onGameReset?.();
          }
        )
        .subscribe();

      // Fetch initial room state
      await this.fetchRoomState();
    } catch (error) {
      console.error("Error connecting to realtime:", error);
      this.callbacks.onConnectionChange?.("error");
      throw error;
    }
  }

  private async fetchRoomState(): Promise<void> {
    const { data: room, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", this.roomId)
      .single();

    if (error) {
      console.error("Error fetching room state:", error);
      return;
    }

    if (room) {
      this.handleRoomUpdate(room);
    }
  }

  private handleRoomUpdate(room: Room): void {
    // Determine player role
    if (room.player_x_id === this.playerId) {
      this.playerRole = "X";
    } else if (room.player_o_id === this.playerId) {
      this.playerRole = "O";
    }

    // Check opponent status
    if (room.status === "waiting") {
      this.callbacks.onOpponentStatusChange?.("waiting");
    } else if (room.status === "playing") {
      const hasOpponent = 
        (this.playerRole === "X" && room.player_o_id) ||
        (this.playerRole === "O" && room.player_x_id);
      
      if (hasOpponent) {
        this.callbacks.onOpponentStatusChange?.("connected");
        if (room.player_x_id === this.playerId && room.player_o_id) {
          this.callbacks.onOpponentJoin?.(room.player_o_id);
        } else if (room.player_o_id === this.playerId && room.player_x_id) {
          this.callbacks.onOpponentJoin?.(room.player_x_id);
        }
      } else {
        this.callbacks.onOpponentStatusChange?.("waiting");
      }
    }

    // Parse board and notify of current state
    try {
      const board: Board = JSON.parse(room.board);
      const winner = checkWinner(board);
      const winningCells = winner && winner !== "draw" ? getWinningCells(board) : [];
      
      this.callbacks.onMove?.(board, room.current_player, winner, winningCells);
    } catch (error) {
      console.error("Error parsing board:", error);
    }
  }

  private handleMove(payload: { index: number; player: Player; board: Board }): void {
    const { board, player } = payload;
    const winner = checkWinner(board);
    const winningCells = winner && winner !== "draw" ? getWinningCells(board) : [];
    const nextPlayer = winner ? null : (player === "X" ? "O" : "X");
    
    this.callbacks.onMove?.(board, nextPlayer, winner, winningCells);
  }

  async makeMove(index: number, board: Board, currentPlayer: Player): Promise<boolean> {
    if (!this.playerRole || this.playerRole !== currentPlayer) {
      return false; // Not this player's turn
    }

    const newBoard = makeMove(board, index, currentPlayer);
    if (!newBoard) {
      return false; // Invalid move
    }

    const winner = checkWinner(newBoard);
    const nextPlayer = winner ? null : (currentPlayer === "X" ? "O" : "X");

    // Update room in database
    const { error: roomError } = await supabase
      .from("rooms")
      .update({
        board: JSON.stringify(newBoard),
        current_player: nextPlayer,
        winner: winner,
        status: winner ? "finished" : "playing",
      })
      .eq("id", this.roomId);

    if (roomError) {
      console.error("Error updating room:", roomError);
      return false;
    }

    // Broadcast move to other player
    if (this.channel) {
      try {
        await this.channel.send({
          type: "broadcast",
          event: "move",
          payload: {
            playerId: this.playerId,
            index,
            player: currentPlayer,
            board: newBoard,
          },
        });
      } catch (error) {
        console.error("Error broadcasting move:", error);
      }
    }

    return true;
  }

  async resetGame(): Promise<boolean> {
    const { createEmptyBoard } = await import("./game");
    const emptyBoard = createEmptyBoard();

    const { error: roomError } = await supabase
      .from("rooms")
      .update({
        board: JSON.stringify(emptyBoard),
        current_player: "X",
        winner: null,
        status: "playing",
      })
      .eq("id", this.roomId);

    if (roomError) {
      console.error("Error resetting room:", roomError);
      return false;
    }

    // Broadcast reset
    if (this.channel) {
      try {
        await this.channel.send({
          type: "broadcast",
          event: "reset",
          payload: {},
        });
      } catch (error) {
        console.error("Error broadcasting reset:", error);
      }
    }

    this.callbacks.onGameReset?.();
    return true;
  }

  async joinRoom(): Promise<{ success: boolean; playerRole?: "X" | "O"; error?: string }> {
    try {
      const response = await fetch(`/api/room/${this.roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: this.playerId,
          action: "join",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Failed to join room" };
      }

      const room: Room = await response.json();
      
      if (room.player_x_id === this.playerId) {
        this.playerRole = "X";
      } else if (room.player_o_id === this.playerId) {
        this.playerRole = "O";
      }

      return { success: true, playerRole: this.playerRole };
    } catch (error) {
      console.error("Error joining room:", error);
      return { success: false, error: "Failed to join room" };
    }
  }

  getPlayerRole(): "X" | "O" | null {
    return this.playerRole;
  }

  disconnect(): void {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
      this.roomSubscription = null;
    }
    this.callbacks.onConnectionChange?.("disconnected");
  }
}


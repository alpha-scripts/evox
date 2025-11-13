import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { createEmptyBoard } from "@/src/lib/game";
import type { Board } from "@/src/lib/game";

// GET: Get room status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    
    const { data: room, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Room not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

// POST: Create or join a room
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    const body = await request.json();
    const { playerId, action } = body;

    if (!playerId) {
      return NextResponse.json(
        { error: "playerId is required" },
        { status: 400 }
      );
    }

    // Check if room exists
    const { data: existingRoom } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (existingRoom) {
      // Room exists - try to join
      if (action === "join") {
        if (existingRoom.player_x_id && existingRoom.player_o_id) {
          return NextResponse.json(
            { error: "Room is full" },
            { status: 400 }
          );
        }

        // Assign player to available slot
        const updates: Partial<typeof existingRoom> = {};
        if (!existingRoom.player_x_id) {
          updates.player_x_id = playerId;
          updates.status = "playing";
        } else if (!existingRoom.player_o_id) {
          updates.player_o_id = playerId;
        }

        const { data: updatedRoom, error } = await supabase
          .from("rooms")
          .update(updates)
          .eq("id", roomId)
          .select()
          .single();

        if (error) throw error;
        return NextResponse.json(updatedRoom);
      }
      return NextResponse.json(existingRoom);
    } else {
      // Create new room
      const initialBoard = createEmptyBoard();
      const { data: newRoom, error } = await supabase
        .from("rooms")
        .insert({
          id: roomId,
          player_x_id: playerId,
          player_o_id: null,
          board: JSON.stringify(initialBoard),
          current_player: "X",
          winner: null,
          status: "waiting",
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(newRoom);
    }
  } catch (error) {
    console.error("Error creating/joining room:", error);
    return NextResponse.json(
      { error: "Failed to create/join room" },
      { status: 500 }
    );
  }
}

// PATCH: Update room (for moves and game state)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    const body = await request.json();
    const { board, currentPlayer, winner, status } = body;

    const updates: Record<string, unknown> = {};
    if (board !== undefined) updates.board = JSON.stringify(board);
    if (currentPlayer !== undefined) updates.current_player = currentPlayer;
    if (winner !== undefined) updates.winner = winner;
    if (status !== undefined) updates.status = status;

    const { data: updatedRoom, error } = await supabase
      .from("rooms")
      .update(updates)
      .eq("id", roomId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}


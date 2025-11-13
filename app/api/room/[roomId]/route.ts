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
    const { data: existingRoom, error: fetchError } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    // If error is "not found", that's okay - we'll create the room
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking for existing room:", fetchError);
      return NextResponse.json(
        { error: `Database error: ${fetchError.message || "Failed to check room"}` },
        { status: 500 }
      );
    }

    if (existingRoom) {
      // Room exists - check if player is already in the room
      const isPlayerX = existingRoom.player_x_id === playerId;
      const isPlayerO = existingRoom.player_o_id === playerId;
      
      if (isPlayerX || isPlayerO) {
        // Player is already in the room, just return it
        return NextResponse.json(existingRoom);
      }

      // Room exists but player is not in it - try to join
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
          if (!existingRoom.player_o_id) {
            updates.status = "waiting"; // Still waiting for second player
          } else {
            updates.status = "playing"; // Both players now
          }
        } else if (!existingRoom.player_o_id) {
          updates.player_o_id = playerId;
          updates.status = "playing"; // Both players now
        }

        // Only update if there are changes
        if (Object.keys(updates).length > 0) {
          const { data: updatedRoom, error: updateError } = await supabase
            .from("rooms")
            .update(updates)
            .eq("id", roomId)
            .select()
            .single();

          if (updateError) {
            console.error("Error updating room:", updateError);
            return NextResponse.json(
              { error: `Failed to join room: ${updateError.message || "Database error"}` },
              { status: 500 }
            );
          }
          return NextResponse.json(updatedRoom);
        }
      }
      return NextResponse.json(existingRoom);
    } else {
      // Room doesn't exist - create new room
      const initialBoard = createEmptyBoard();
      const { data: newRoom, error: insertError } = await supabase
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

      if (insertError) {
        // If it's a duplicate key error, the room was created between our check and insert
        // Try to fetch it again
        if (insertError.code === "23505" || insertError.message?.includes("duplicate key")) {
          const { data: room, error: retryError } = await supabase
            .from("rooms")
            .select("*")
            .eq("id", roomId)
            .single();
          
          if (!retryError && room) {
            // Check if player is in this room
            if (room.player_x_id === playerId || room.player_o_id === playerId) {
              return NextResponse.json(room);
            }
            // Room exists but player not in it - try to join
            return NextResponse.json(room);
          }
        }
        
        console.error("Error creating room:", insertError);
        return NextResponse.json(
          { error: `Failed to create room: ${insertError.message || "Database error"}` },
          { status: 500 }
        );
      }
      
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


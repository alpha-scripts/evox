import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (typeof window !== "undefined") {
    console.warn(
      "Supabase environment variables are not set. Online multiplayer will not work."
    );
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Room {
  id: string;
  created_at: string;
  player_x_id: string | null;
  player_o_id: string | null;
  board: string; // JSON stringified Board
  current_player: "X" | "O" | null;
  winner: "X" | "O" | "draw" | null;
  status: "waiting" | "playing" | "finished";
}

export interface Move {
  id: string;
  room_id: string;
  player: "X" | "O";
  index: number;
  created_at: string;
}


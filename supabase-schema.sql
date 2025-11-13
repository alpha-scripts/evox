-- Create rooms table for Tic Tac Toe online multiplayer
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  player_x_id TEXT,
  player_o_id TEXT,
  board TEXT NOT NULL DEFAULT '["null","null","null","null","null","null","null","null","null"]',
  current_player TEXT CHECK (current_player IN ('X', 'O', NULL)),
  winner TEXT CHECK (winner IN ('X', 'O', 'draw', NULL)),
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished'))
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read rooms (for joining)
CREATE POLICY "Allow public read access to rooms"
  ON rooms FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert rooms (for creating)
CREATE POLICY "Allow public insert access to rooms"
  ON rooms FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to update rooms (for moves)
CREATE POLICY "Allow public update access to rooms"
  ON rooms FOR UPDATE
  USING (true);

-- Enable Realtime for rooms table
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;


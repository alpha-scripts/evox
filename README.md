# Tic Tac Toe

A modern, responsive Tic Tac Toe web app built with Next.js 15, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- 🎮 Play against another player or AI opponent
- 🌐 **Online multiplayer** - Play with friends in real-time
- 🤖 Three AI difficulty levels (Easy, Medium, Hard)
- 🎨 Sleek, minimal, and interactive UI
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- ♿ Fully accessible with keyboard navigation and ARIA labels
- 🚀 Built with Next.js 15 App Router
- 💅 Styled with TailwindCSS and shadcn/ui

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Realtime:** Supabase Realtime
- **Testing:** Vitest, React Testing Library

## Getting Started

First, install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Testing

Run the test suite:

```bash
npm run test
```

Run tests once (CI mode):

```bash
npm run test:run
```

Run tests with UI:

```bash
npm run test:ui
```

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to your Vercel account (or create one)
   - Link to an existing project or create a new one
   - Confirm the project settings

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in the [Vercel Dashboard](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your app will be live!

### Environment Variables

For **online multiplayer** functionality, you need to set up Supabase:

1. **Create a Supabase project:**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be fully set up

2. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Run the SQL from `supabase-schema.sql` to create the rooms table

3. **Get your API keys:**
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

4. **Create `.env.local` file:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Enable Realtime:**
   - In Supabase Dashboard, go to Database → Replication
   - Enable replication for the `rooms` table

**Note:** The game works without Supabase for local play (1P and 2P modes). Online multiplayer requires Supabase configuration.

## Online Multiplayer Setup

### Quick Start

1. Click the **"Play Online"** button on the main page
2. A unique room ID will be generated
3. Share the room link with your opponent
4. Both players join the same room and play in real-time!

### How It Works

- First player to join becomes **X**
- Second player becomes **O**
- Moves sync in real-time via Supabase Realtime
- Connection status indicators show when opponent connects/disconnects
- Game state is preserved even if one player refreshes

## Project Structure

```
tictactoe/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   │   └── room/           # Room management endpoints
│   ├── online/             # Online multiplayer pages
│   │   └── [roomId]/       # Dynamic room page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main game page
├── src/
│   ├── components/         # React components
│   │   ├── Board.tsx       # Game board component
│   │   ├── Square.tsx      # Individual square component
│   │   ├── Controls.tsx    # Game controls (New Game, Mode, Difficulty, Play Online)
│   │   └── Header.tsx      # Game header with status
│   ├── lib/                # Utility functions
│   │   ├── game.ts         # Core game logic and AI
│   │   ├── realtime.ts     # Realtime multiplayer logic
│   │   └── supabase.ts     # Supabase client configuration
│   └── __tests__/          # Test files
│       ├── ui.test.tsx     # UI component tests
│       └── online.test.ts  # Online multiplayer tests
├── components/             # shadcn/ui components
├── public/                 # Static assets
├── supabase-schema.sql     # Database schema for Supabase
└── ...
```

## License

ISC


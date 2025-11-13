# Tic Tac Toe

A modern, responsive Tic Tac Toe web app built with Next.js 15, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- 🎮 Play against another player or AI opponent
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

No environment variables are required for this project.

## Project Structure

```
tictactoe/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main game page
├── src/
│   ├── components/         # React components
│   │   ├── Board.tsx       # Game board component
│   │   ├── Square.tsx      # Individual square component
│   │   ├── Controls.tsx    # Game controls (New Game, Mode, Difficulty)
│   │   └── Header.tsx      # Game header with status
│   ├── lib/                # Utility functions
│   │   └── game.ts         # Core game logic and AI
│   └── __tests__/          # Test files
│       └── ui.test.tsx     # UI component tests
├── components/             # shadcn/ui components
├── public/                 # Static assets
└── ...
```

## License

ISC


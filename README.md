# VNEiL Intelligent Care - Website

A modern, responsive React-based website for VNEiL Intelligent Care, featuring AI-powered healthcare solutions.

## Features

- 🎨 Modern and aesthetic design with smooth animations
- 🌓 Dark mode support
- 📱 Fully responsive layout
- 💬 Interactive chatbot with Supabase integration
- ⚡ Built with Vite for fast development
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional, for chatbot):
Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the development server:
```bash
npm start
# or
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Chatbot.tsx
├── contexts/         # React contexts
│   └── ThemeContext.tsx
├── lib/              # Utility libraries
│   └── supabase.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Supabase (for chatbot)

## License

© 2024 VNEiL Intelligent Care


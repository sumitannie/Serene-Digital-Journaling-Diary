Serene Diary 📔
Your private digital sanctuary for thoughts, memories, and daily reflections.

Serene is a high-performance, full-stack journal application designed for a calm and focused writing experience. It features a modern, visual rich-text editor, deep customization options, and local-first performance.

🚀 Key Features
- Visual Rich-Text Editor: A "Word-Processor" style writing experience with instant feedback for Bold, Italic, and Underline formatting.

- Aesthetic Typography: A massive library of fonts including Handwriting, Calligraphy, Typewriter, and Modern Minimal styles to match your mood.

- Personalized Styling: Dynamic text color switching and mood tracking with an integrated emoji picker.

- Media Support: Seamlessly attach images to your memories to capture the full story.

- Smart Search: Instantly find old memories by searching through titles, content, or specific moods.

- Voice Input: Dictate your thoughts using the integrated microphone tool.

- Daily Inspiration: Start every writing session with a curated daily thought or quote.

🛠️ Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion (for smooth animations).

- Backend: Node.js, Express.

- Database & ORM: Drizzle ORM for type-safe database management.

- UI Components: Radix UI (accessible primitives) and Lucide React icons.

- Routing: Wouter for lightweight, fast navigation.

📁 Project Structure
```Bash
YourThoughts/
├── client/             // React Frontend (Vite)
│   ├── src/
│   │   ├── components/ // Reusable UI components (Editor, Toolbar)
│   │   ├── pages/      // Main views (Home, Editor)
│   │   └── lib/        // Shared hooks and state (Zustand)
├── server/             // Node.js/Express Backend
├── shared/             // Shared Type Definitions & Drizzle Schema
├── node_modules/       // Backend Dependencies
├── drizzle.config.ts   // Database Tooling Configuration
└── package.json        // Root configuration for the unified monorepo
```
⚙️ Getting Started
1. Prerequisites
Ensure you have Node.js installed on your machine.

2. Installation
Since this is a unified monorepo, you only need to install dependencies once at the root level:

```Bash
npm install
3. Development
```
Run both the frontend and backend simultaneously:

```Bash
npm run dev
The app will be available at http://localhost:5000.
```
Technical Deep Dive:

This project utilizes an Integrated Monorepo structure. By housing the client and server in the same repository, it enables End-to-End Type Safety. Both the frontend and backend import from shared/schema.ts, ensuring that any changes to the database structure are instantly reflected across the entire stack, reducing bugs and development time.

Future Improvements:

- AI-Powered Insights & Suggestions: Integrate a Large Language Model (like Gemini) to provide automatic sentiment analysis of entries, generate personalized writing prompts based on past moods, or summarize a user's week to highlight recurring themes and growth.

- Auto-Save & Drafts: Implement a debounced saving mechanism that automatically stores the user's progress in the database as they type, preventing data loss during crashes.

- Mood Analytics Dashboard: Add a dedicated statistics page using a library like Recharts to visualize mood trends and entry frequency over time through interactive line charts and calendars.

- Encrypted Local Privacy: Utilize the Web Crypto API to encrypt journal content before it is stored, ensuring that even at the database level, the user's private thoughts remain unreadable to others.

- PWA Support: Convert the application into a Progressive Web App so that it can be "installed" on mobile devices and desktops, allowing for a native-app feel and offline accessibility.

- Data Export (PDF/JSON): Build a feature that allows users to export their entire journal into a beautifully formatted PDF for printing or a JSON file for easy data portability and backup.
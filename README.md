# AI Chat React

A modern chat application built with Next.js that supports both human-to-human conversations and AI-powered chats using OpenAI's GPT models.

## Features

### Chat Management
- **Dual Chat Types**: Support for both private human chats and AI-powered conversations
- **Real-time Messaging**: Send and receive messages with timestamps
- **Chat History**: Persistent conversation storage using Zustand
- **Message Search**: Search through message history with result highlighting and navigation
- **Responsive Design**: Mobile design with touch gestures

### AI Integration
- **OpenAI GPT Integration**: Chat with AI models (model-changing not implemented)
- **Conversation Context**: Maintains conversation history for coherent AI responses
- **Loading States**: Visual feedback during AI response generation
- **Error Handling**: Graceful fallback for failed AI requests

### User Interface
- **Modern Sidebar**: Collapsible sidebar with chat list and search
- **Chat Filtering**: Filter chats by type (AI/Human), name, or recent activity
- **Touch Gestures**: Swipe from left edge to open sidebar on mobile
- **Message Bubbles**: Distinct styling for sent/received messages
- **Avatar Support**: Custom avatars for users and AI assistants

### Mobile Experience
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Touch Navigation**: Swipe gestures for sidebar control
- **Mobile-First Design**: Priority on mobile usability

## Technologies Used

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### UI Components
- **shadcn/ui**: Modern React components built on Radix UI
- **Lucide React**: Beautiful icon library

### State Management
- **Zustand**: Lightweight state management for chat data and AI response tracking

### AI Integration
- **OpenAI SDK**: Official OpenAI JavaScript SDK for GPT integration

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenAI API key (for AI chat functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-chat-react
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm run start
```

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)

2. Import your project to [Vercel](https://vercel.com/new)

3. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key

4. Deploy automatically on every push to main branch


## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Main sidebar component
│   ├── chat-layout.tsx   # Chat interface
│   ├── chat-panel.tsx    # Individual chat item
│   ├── message.tsx       # Message bubble component
│   └── new-chat-modal.tsx # New chat creation modal
├── lib/                   # Utilities and configuration
│   ├── openai.ts         # OpenAI integration
│   ├── theme.ts          # Theme configuration
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── store/                 # State management
│   ├── useChatStore.ts   # Main chat state
│   └── useAIChatStore.ts # AI conversation tracking
└── public/               # Static assets
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: OpenAI API key for AI chat functionality

### Customization

- **Themes**: Modify `lib/theme.ts` to customize the visual appearance
- **AI Models**: Update `lib/openai.ts` to use different GPT models
- **UI Components**: Extend or modify components in `components/` directory


## Security Considerations

- **API Key Exposure**: Current implementation exposes OpenAI API key to the browser
- **Production Recommendation**: Implement backend API routes for secure AI communication
- **Rate Limiting**: Consider implementing rate limiting for AI requests
- **Data Privacy**: Ensure compliance with data protection regulations

# Inkwell — AI Chatbot

A React + Vite chat interface: sidebar with conversation history, streaming-style
typing indicator, dark/light themes, retry on failure, copy/delete per message,
and persistence to `localStorage` so refreshing the page doesn't lose your chats.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. With no `.env` file, the app runs in **demo mode**
and returns simulated replies so you can try the whole UI immediately.

## Connecting a real AI backend

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=https://your-api-url.com
VITE_API_KEY=your_api_key
```

The app expects your backend to expose:

```
POST {VITE_API_URL}/chat
Body:     { "messages": [{ "role": "user" | "assistant", "content": "..." }], "model": "default" }
Response: { "reply": "..." }
```

If your provider's contract differs (e.g. calling OpenAI, Anthropic, or your
own server directly), edit `src/services/chatbotService.js` — it's the single
place that builds the request and reads the response, so nothing else in the
app needs to change.

**Note:** calling a provider's API directly from the browser exposes your API
key to anyone who opens dev tools. For anything beyond local testing, put a
small server between the browser and the provider, and point `VITE_API_URL`
at that server instead.

## Project structure

```
src/
├── components/
│   ├── Navbar/        top bar: menu toggle, title, theme switch
│   ├── Sidebar/        conversation list, new/delete/clear
│   ├── Chat/           ChatWindow, MessageBubble, MessageInput, TypingIndicator
│   └── Loader/         spinner + skeleton primitives
├── context/
│   ├── ThemeContext.jsx   dark/light state, persisted
│   └── ChatContext.jsx    conversations, sending, retry, persisted
├── hooks/
│   ├── useChat.js
│   └── useCopyToClipboard.js
├── services/
│   ├── api.js              fetch wrapper: headers, timeout, error shape
│   └── chatbotService.js   builds chat requests, parses replies
├── App.jsx
└── main.jsx
```

## Scripts

| Command           | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | start dev server         |
| `npm run build`    | production build to `dist/` |
| `npm run preview`  | preview the production build |

## Notes

- Conversations and theme are stored in `localStorage` only — there's no
  account system or server-side storage in this starter.
- Retry re-sends the last user message and replaces the failed reply.
- Everything is plain CSS (no Tailwind) so there's nothing extra to configure.

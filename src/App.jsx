import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import ChatWindow from './components/Chat/ChatWindow.jsx'
import MessageInput from './components/Chat/MessageInput.jsx'
import { useChat } from './hooks/useChat'
import './App.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const { activeConversation } = useChat()

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app__main">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          conversationTitle={activeConversation?.title}
        />
        <ChatWindow onSuggestion={setDraft} />
        <MessageInput value={draft} onValueChange={setDraft} />
      </div>
    </div>
  )
}

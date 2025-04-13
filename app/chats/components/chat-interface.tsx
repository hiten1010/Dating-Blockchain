"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ChatList from "./chat-list"
import ConversationPanel from "./conversation-panel"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockConversations } from "@/data/mock-conversations"

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [conversations, setConversations] = useState(mockConversations)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showChatList, setShowChatList] = useState(!isMobile)

  // Update UI when screen size changes
  useEffect(() => {
    setShowChatList(!isMobile || !selectedChat)
  }, [isMobile, selectedChat])

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)
    if (isMobile) {
      setShowChatList(false)
    }

    // Mark as read when selected
    setConversations(conversations.map((chat) => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat)))
  }

  const handleBackToList = () => {
    if (isMobile) {
      setShowChatList(true)
      setSelectedChat(null)
    }
  }

  const handleSendMessage = (chatId: string, message: string) => {
    // Update the conversation with the new message
    setConversations(
      conversations.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `msg-${Date.now()}`,
                  content: message,
                  sender: "user",
                  timestamp: new Date().toISOString(),
                  isAI: false,
                },
              ],
            }
          : chat,
      ),
    )
  }

  return (
    <div className="flex h-[calc(100vh-250px)] min-h-[500px] overflow-hidden">
      {/* Chat List */}
      {showChatList && (
        <motion.div
          className="w-full md:w-1/3 lg:w-1/4 md:min-w-[300px] h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ChatList conversations={conversations} selectedChatId={selectedChat} onSelectChat={handleSelectChat} />
        </motion.div>
      )}

      {/* Conversation Panel */}
      {selectedChat && !showChatList && (
        <div className="md:hidden absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToList}
            className="bg-white/80 hover:bg-pink-50 text-pink-600 rounded-full h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}

      {selectedChat ? (
        <motion.div
          className="flex-1 h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ConversationPanel
            conversation={conversations.find((c) => c.id === selectedChat)!}
            onSendMessage={(message) => handleSendMessage(selectedChat, message)}
          />
        </motion.div>
      ) : (
        !isMobile && (
          <div className="flex-1 h-full flex items-center justify-center">
            <div className="text-center p-8 backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 max-w-md">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Select a conversation</h3>
              <p className="text-slate-600">
                Choose a chat from the list to start messaging or let your AI twin assist you with the conversation.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )
}


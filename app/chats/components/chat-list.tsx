"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Bot, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Conversation } from "@/types/chat"

interface ChatListProps {
  conversations: Conversation[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
}

export default function ChatList({ conversations, selectedChatId, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()

    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // If this week, show day name
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    }

    // Otherwise show date
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  const getLastMessage = (conversation: Conversation) => {
    if (conversation.messages.length === 0) return ""
    return conversation.messages[conversation.messages.length - 1]
  }

  return (
    <div className="h-full backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 p-4 flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Your Conversations</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-white/80 border-pink-100 focus:border-pink-300 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const lastMessage = getLastMessage(conversation)

              return (
                <motion.div
                  key={conversation.id}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedChatId === conversation.id
                      ? "bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200"
                      : "hover:bg-white/80 bg-white/40"
                  } border border-transparent hover:border-pink-100`}
                  onClick={() => onSelectChat(conversation.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white">
                          {conversation.user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-slate-800 truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {lastMessage ? formatTimestamp(lastMessage.timestamp) : ""}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-slate-600 truncate max-w-[150px]">
                          {lastMessage?.isAI && <Bot className="h-3 w-3 inline mr-1 text-pink-500" />}
                          {lastMessage?.content || "Start a conversation"}
                        </p>

                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-2 py-0 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}


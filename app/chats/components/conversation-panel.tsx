"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Bot,
  Sparkles,
  RefreshCw,
  ImageIcon,
  Mic,
  MoreVertical,
  Settings,
  AlertTriangle,
  Info,
  Trash,
  Shield,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Conversation, Message } from "@/app/types/chat"
import { aiSuggestions } from "@/data/ai-suggestions"
import { useVeridaClient } from "@/app/lib/clientside-verida"
import { saveMessage, convertToVeridaMessage } from "@/app/lib/chat-message-service"

// Extended Conversation type to include name property
interface ExtendedConversation extends Conversation {
  name?: string;
}

interface ConversationPanelProps {
  conversation: ExtendedConversation
  onSendMessage: (message: string) => void
}

export default function ConversationPanel({ conversation, onSendMessage }: ConversationPanelProps) {
  const [message, setMessage] = useState("")
  const [aiMode, setAiMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState("")
  const [showAiInsight, setShowAiInsight] = useState(false)
  const [aiInsight, setAiInsight] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showSettings, setShowSettings] = useState(false)
  const { client, isLoading, getDidId } = useVeridaClient()
  const [userDid, setUserDid] = useState<string | null>(null)
  const [userName, setUserName] = useState("Me")

  // Safety check in case conversation is undefined
  if (!conversation) {
    return (
      <div className="h-full backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Conversation not found</h3>
          <p className="text-slate-600">
            The conversation you're looking for could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Get user DID when Verida client is loaded
  useEffect(() => {
    if (!isLoading && client && client.isConnected()) {
      getDidId().then(did => {
        if (did) {
          setUserDid(did);
          
          // Try to get stored username from localStorage
          const storedName = localStorage.getItem("testUserName");
          if (storedName) {
            setUserName(storedName);
          }
        }
      });
    }
  }, [isLoading, client, getDidId]);

  // Scroll to bottom when messages change - with protection against undefined messages
  useEffect(() => {
    if (conversation?.messages?.length) {
      scrollToBottom()
    }
  }, [conversation?.messages])

  // Use memo to keep messages stable between renders
  const messages = useMemo(() => {
    return conversation?.messages || [];
  }, [conversation?.messages]);

  // Generate AI suggestion on mount
  useEffect(() => {
    generateAiSuggestion()

    // Show AI insight after a delay
    const timer = setTimeout(() => {
      const randomInsight = aiSuggestions.insights[Math.floor(Math.random() * aiSuggestions.insights.length)]
      setAiInsight(randomInsight)
      setShowAiInsight(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        // Create message object for storing
        const messageObj = {
          id: `msg-${Date.now()}`,
          content: message,
          sender: "user",
          timestamp: new Date().toISOString(),
          isAI: false,
        };
        
        // Call the onSendMessage callback to update UI immediately
        onSendMessage(message);
        
        // Save to Verida if authenticated
        if (userDid && client && client.isConnected()) {
          try {
            // Convert to Verida format
            const veridaMessage = convertToVeridaMessage(
              messageObj,
              conversation.id,
              userDid,
              userName
            );
            
            // CRITICAL: Use the exact conversation name as the group name
            veridaMessage.groupName = conversation.name || `Chat with ${conversation.user.name}`;
            console.log(`Sending message to group: ${conversation.id} with name: ${veridaMessage.groupName}`);
            
            // Save to Verida
            await saveMessage(veridaMessage);
            console.log("Message saved to Verida:", veridaMessage);
          } catch (error) {
            console.error("Failed to save message to Verida:", error);
            toast({
              title: "Message Sent",
              description: "Message delivered but failed to save to blockchain.",
              variant: "destructive",
            });
          }
        } else {
          console.warn("Cannot save to Verida: Not authenticated");
        }
        
        // Clear the input
        setMessage("");
        
        // Simulate AI response if AI mode is on
        if (aiMode) {
          simulateAiResponse();
        }
        
        // Generate new AI suggestion
        generateAiSuggestion();
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Failed to Send",
          description: "Could not send your message. Please try again.",
          variant: "destructive",
        });
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const simulateAiResponse = () => {
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      setIsTyping(false)

      // Get random AI response
      const responses = aiSuggestions.responses
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      // Call the onSendMessage callback to update UI immediately
      onSendMessage(randomResponse)
      
      // Create and save AI message to Verida if user is authenticated
      if (userDid && client && client.isConnected()) {
        const aiMessage = {
          id: `ai-msg-${Date.now()}`,
          content: randomResponse,
          sender: "ai",
          timestamp: new Date().toISOString(),
          isAI: true,
        };
        
        try {
          // Convert to Verida format and save
          const veridaMessage = convertToVeridaMessage(
            aiMessage,
            conversation.id,
            `ai-twin-${userDid}`, // AI twin DID
            "AI Twin" // AI name
          );
          
          // CRITICAL: Use the exact conversation name as the group name
          veridaMessage.groupName = conversation.name || `Chat with ${conversation.user.name}`;
          console.log(`Sending AI message to group: ${conversation.id} with name: ${veridaMessage.groupName}`);
          
          // Save the message to Verida
          await saveMessage(veridaMessage);
          console.log("AI message saved to Verida:", veridaMessage);
        } catch (error) {
          console.error("Failed to save AI message to Verida:", error);
        }
      }
    }, 2000)
  }

  const generateAiSuggestion = () => {
    const suggestions = aiSuggestions.suggestions
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setCurrentSuggestion(randomSuggestion)
  }

  const useSuggestion = () => {
    setMessage(currentSuggestion)
    generateAiSuggestion()
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleAiMode = () => {
    setAiMode(!aiMode)

    toast({
      title: aiMode ? "AI Mode Disabled" : "AI Mode Enabled",
      description: aiMode
        ? "You are now in manual mode. Your AI twin will only provide suggestions."
        : "Your AI twin can now respond on your behalf. You can disable this anytime.",
      variant: "default",
    })
  }

  const dismissAiInsight = () => {
    setShowAiInsight(false)
  }

  const handleDeleteChat = () => {
    toast({
      title: "Chat Deleted",
      description: "This conversation has been deleted.",
      variant: "default",
    })
    setShowSettings(false)
  }

  return (
    <div className="h-full backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-pink-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white">
              {conversation.user.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-slate-800">{conversation.user.name}</h3>
            <div className="flex items-center gap-2">
              {conversation.user.isOnline ? (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 text-xs rounded-full px-2 py-0"
                >
                  Online
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-slate-50 text-slate-700 border-slate-200 text-xs rounded-full px-2 py-0"
                >
                  Offline
                </Badge>
              )}

              {conversation.user.verified && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs rounded-full px-2 py-0"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
            <Switch id="ai-mode" checked={aiMode} onCheckedChange={toggleAiMode} />
            <Label htmlFor="ai-mode" className="flex items-center gap-1 text-slate-700 cursor-pointer">
              <Bot className="h-4 w-4 text-pink-500" />
              AI Mode
            </Label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <MoreVertical className="h-5 w-5 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-pink-100 rounded-xl">
              <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Chat Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isUser={msg.sender === "user"}
              showAvatar={index === 0 || messages[index - 1].sender !== msg.sender}
              userAvatar={conversation.user.avatar}
              userName={conversation.user.name}
            />
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-xs">
                  {conversation.user.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="bg-white rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] shadow-sm">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* AI Insight */}
          {/* <AnimatePresence>
            {showAiInsight && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-3 border border-pink-100 flex items-start gap-2"
              >
                <Sparkles className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-pink-700 mb-1">AI Insight</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full hover:bg-pink-100 text-pink-500"
                      onClick={dismissAiInsight}
                    >
                      <span className="sr-only">Dismiss</span>
                      <span aria-hidden>×</span>
                    </Button>
                  </div>
                  <p className="text-sm text-pink-600">{aiInsight}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* AI Suggestions */}
      <div className="px-4 py-2 border-t border-pink-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 border-pink-200 hover:bg-pink-50 text-pink-700 rounded-full flex-shrink-0"
                onClick={useSuggestion}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {currentSuggestion}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 border-pink-200 hover:bg-pink-50 text-pink-700 rounded-full flex-shrink-0"
                onClick={generateAiSuggestion}
              >
                <RefreshCw className="h-3 w-3" />
                <span className="sr-only">New suggestion</span>
              </Button>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-pink-50 text-slate-600"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-pink-100 text-slate-700 max-w-xs p-3 rounded-xl">
                <p>AI suggestions are based on your conversation history and shared interests.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-pink-100">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[60px] max-h-[150px] bg-white/80 border-pink-100 focus:border-pink-300 rounded-xl resize-none pr-20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-pink-50 text-slate-600"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-pink-50 text-slate-600"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full h-10 w-10 flex-shrink-0"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {aiMode && (
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg p-2">
            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
            <span>AI Mode is active. Your AI twin may respond on your behalf.</span>
          </div>
        )}
      </div>

      {/* Chat Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-white border border-pink-100 text-slate-800 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-pink-700">Chat Settings</DialogTitle>
            <DialogDescription className="text-slate-600">
              Manage your conversation settings and privacy.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-slate-700">Secure Chat Logs</Label>
                <p className="text-xs text-slate-500">Verify messages with Sprite+ for authenticity</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-slate-700">AI Analysis</Label>
                <p className="text-xs text-slate-500">Allow AI to analyze this conversation</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-slate-700">Message Encryption</Label>
                <p className="text-xs text-slate-500">End-to-end encrypt all messages</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-2 mt-4">
              <Shield className="h-4 w-4 text-slate-600 mt-0.5" />
              <p className="text-xs text-slate-600">
                Messages are stored securely off-chain. Only you and your match can see them.
              </p>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteChat} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash className="h-4 w-4 mr-2" />
              Delete Chat
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="bg-white border-pink-200 hover:bg-pink-50 text-pink-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isUser: boolean
  showAvatar: boolean
  userAvatar: string
  userName: string
}

function MessageBubble({ message, isUser, showAvatar, userAvatar, userName }: MessageBubbleProps) {
  // Get the actual sender name from the message or fall back to the conversation user name
  const displayName = isUser ? "Me" : (message.senderName || userName);
  
  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : ""}`}>
      {!isUser && showAvatar ? (
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src={userAvatar} alt={displayName} />
          <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-xs">
            {displayName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      ) : !isUser ? (
        <div className="w-8" />
      ) : null}

      <div
        className={`px-4 py-2 max-w-[80%] shadow-sm ${
          isUser
            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl rounded-br-none"
            : "bg-white rounded-2xl rounded-bl-none"
        }`}
      >
        {message.isAI && (
          <div className="flex items-center gap-1 mb-1">
            <Bot className="h-3 w-3 text-pink-300" />
            <span className="text-xs text-pink-200">AI Response</span>
          </div>
        )}
        {!isUser && showAvatar && message.senderName && (
          <div className="text-xs font-semibold text-pink-500 mb-1">
            {message.senderName}
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? "text-pink-200" : "text-slate-400"}`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>

      {isUser && showAvatar ? (
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white text-xs">
            Me
          </AvatarFallback>
        </Avatar>
      ) : isUser ? (
        <div className="w-8" />
      ) : null}
    </div>
  )
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}


"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Brain, Bot, User, Database, Sparkles, Send, Loader2, ArrowLeft } from "lucide-react"
import { getUserAiTwin } from "../lib/verida-ai-twin-service"
import { generateAiTwinResponse } from "../lib/prompts/ai-twin-service"
import Link from "next/link"

export default function ChatWithTwinPage() {
  const [twinData, setTwinData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isAi: boolean }[]>([])
  const [userInput, setUserInput] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Fetch Twin data when component mounts
  useEffect(() => {
    const fetchTwinData = async () => {
      try {
        setIsLoading(true);
        
        // Get AI twin data using the service function
        const data = await getUserAiTwin();
        
        if (data) {
          console.log('Successfully loaded AI twin data:', data.name);
          setTwinData(data);
          
          // Start conversation with welcome message
          setTimeout(() => {
            setMessages([
              { 
                content: `Welcome! I'm ${data.name}'s AI twin. How can I help you today?`, 
                isAi: true 
              }
            ]);
          }, 1000);
          
          toast({
            title: "Twin Connected",
            description: `${data.name}'s AI twin is ready to chat with you.`,
          });
        } else {
          console.log("No AI twin data found in Verida");
          toast({
            title: "No AI Twin Found",
            description: "You need to create an AI twin first before chatting.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch twin data:", error);
        toast({
          title: "Error Loading Twin",
          description: error instanceof Error ? error.message : "Could not load your AI twin from Verida.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTwinData();
  }, []);

  // Handle user input submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim() || !twinData || isTyping) return;
    
    // Add user message to chat
    const userMessage = userInput.trim();
    setMessages(prev => [...prev, { content: userMessage, isAi: false }]);
    setUserInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Generate response using LLM service
      const response = await generateAiTwinResponse(twinData, userMessage);
      
      // Hide typing indicator
      setIsTyping(false);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { content: response, isAi: true }]);
    } catch (error) {
      console.error('Error generating LLM response:', error);
      
      // Hide typing indicator
      setIsTyping(false);
      
      // Add fallback response
      const fallbackResponse = "I'm sorry, I couldn't process your message right now. Could you try again?";
      setMessages(prev => [...prev, { content: fallbackResponse, isAi: true }]);
      
      // Show error toast
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 text-slate-800 overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin h-8 w-8 border-4 border-pink-500 rounded-full border-t-transparent"></div>
              <div>
                <h3 className="font-medium">Connecting to Your Twin</h3>
                <p className="text-sm text-gray-500">Retrieving your AI twin from Verida...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 blur-3xl animate-pulse"></div>
          <div
            className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-[15%] left-[20%] w-72 h-72 rounded-full bg-gradient-to-r from-rose-300 to-red-300 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAxMjgsIDE3MCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative container mx-auto px-4 py-8 flex flex-col h-screen max-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/create-twin" className="p-2 rounded-full hover:bg-white/30 transition-colors">
              <ArrowLeft className="h-5 w-5 text-pink-600" />
            </Link>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Twin" />
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white">
                  {twinData?.name ? twinData.name.substring(0, 2).toUpperCase() : "AI"}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {twinData?.name || "AI Twin"}
                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 text-xs">
                    AI Twin
                  </Badge>
                </h1>
                {twinData && (
                  <p className="text-sm text-slate-600">
                    {twinData.age && `${twinData.age} • `}
                    {twinData.location && `${twinData.location} • `}
                    {twinData.occupation || ""}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-700">Online</span>
          </div>
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 p-6 shadow-xl flex flex-col overflow-hidden">
          {!twinData && !isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Sparkles className="h-16 w-16 text-pink-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-700 mb-2">No AI Twin Found</h2>
              <p className="text-slate-600 text-center max-w-md mb-6">
                You need to create an AI twin before you can chat with it. Go to the twin creation page to get started.
              </p>
              <Link href="/create-twin">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Create Your AI Twin
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Chat messages */}
              <div 
                className="flex-1 overflow-y-auto pr-2 space-y-4"
                style={{ 
                  scrollBehavior: "smooth",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(236, 72, 153, 0.3) transparent"
                }}
                ref={chatContainerRef}
              >
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-end gap-2 ${!msg.isAi ? "justify-end" : ""}`}>
                    {msg.isAi && (
                      <Avatar className="h-8 w-8 border-2 border-white flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-xs">
                          {twinData?.name ? twinData.name.substring(0, 2).toUpperCase() : "AI"}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`px-4 py-2 max-w-[80%] shadow-sm ${
                        !msg.isAi
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl rounded-br-none"
                          : "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl rounded-bl-none"
                      }`}
                    >
                      {msg.isAi && (
                        <div className="flex items-center gap-1 mb-1">
                          <Bot className="h-3 w-3 text-pink-200" />
                          <span className="text-xs text-pink-200">{twinData?.name || "AI Twin"}</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>

                    {!msg.isAi && (
                      <Avatar className="h-8 w-8 border-2 border-white flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white text-xs">
                          YOU
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-xs">
                        {twinData?.name ? twinData.name.substring(0, 2).toUpperCase() : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] shadow-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <Bot className="h-3 w-3 text-pink-200" />
                        <span className="text-xs text-pink-200">{twinData?.name || "AI Twin"}</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Textarea
                  placeholder="Type a message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-white/80 border-pink-100 focus:border-pink-300 resize-none"
                  disabled={!twinData || isTyping}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  disabled={!twinData || !userInput.trim() || isTyping}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white self-end h-full"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-4 text-center text-sm text-slate-500">
          <p>Powered by Verida LLM API • Your data is securely stored in your Verida wallet</p>
        </div>
      </div>
    </div>
  )
} 
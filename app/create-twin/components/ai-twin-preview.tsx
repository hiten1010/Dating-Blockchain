"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Bot, User, Database, Sparkles, Send } from "lucide-react"

interface AiTwinPreviewProps {
  formData: any
}

export default function AiTwinPreview({ formData }: AiTwinPreviewProps) {
  const [previewMessage, setPreviewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isAi: boolean }[]>([])
  const [userInput, setUserInput] = useState("")
  const [veridaStatus, setVeridaStatus] = useState<'loading' | 'loaded' | 'none'>('none')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Check for Verida data
  useEffect(() => {
    if (formData.name && formData.favouriteType) {
      setVeridaStatus('loaded');
    }
  }, [formData]);

  // Generate chat messages based on form data
  useEffect(() => {
    // Only generate if we have basic data
    if (!formData.name) return;
    
    // Clear existing messages
    setMessages([]);
    
    // Add a user greeting message
    setTimeout(() => {
      setMessages([{ content: "Hi there! Tell me about yourself.", isAi: false }]);
      
      // Start AI twin response
      setTimeout(() => {
        simulateTyping(generateIntroduction());
      }, 1000);
    }, 500);
  }, [formData.name, formData.bio]);

  // Generate a personalized introduction based on form data
  const generateIntroduction = () => {
    let intro = `Hi! I'm ${formData.name}'s AI twin.`;
    
    if (formData.age) {
      intro += ` I'm ${formData.age} years old`;
      if (formData.location) {
        intro += ` and I'm from ${formData.location}.`;
      } else {
        intro += '.';
      }
    } else if (formData.location) {
      intro += ` I'm from ${formData.location}.`;
    }
    
    if (formData.occupation) {
      intro += ` I work as a ${formData.occupation}.`;
    }
    
    if (formData.bio) {
      intro += ` ${formData.bio}`;
    }
    
    return intro;
  }
  
  // Generate information about interests and personality
  const generateAboutMessage = () => {
    let message = '';
    
    if (formData.personalityTraits && formData.personalityTraits.length > 0) {
      message += `I would describe myself as ${formData.personalityTraits.slice(0, 3).join(", ")}.`;
    }
    
    if (formData.interests && formData.interests.length > 0) {
      if (message) message += ' ';
      message += `I'm interested in ${formData.interests.slice(0, 3).join(", ")}.`;
    }
    
    if (formData.hobbies && formData.hobbies.length > 0) {
      if (message) message += ' ';
      message += `In my free time, I enjoy ${formData.hobbies.slice(0, 2).join(" and ")}.`;
    }
    
    return message || "I'd love to chat and get to know each other better!";
  }

  // Generate message about relationship preferences
  const generateRelationshipMessage = () => {
    let message = '';
    
    if (formData.relationshipGoals) {
      message += `I'm looking for ${formData.relationshipGoals}.`;
    }
    
    if (formData.lookingFor && formData.lookingFor.length > 0) {
      if (message) message += ' ';
      message += `I'm attracted to people who are ${formData.lookingFor.slice(0, 3).join(", ")}.`;
    }
    
    if (formData.dealBreakers && formData.dealBreakers.length > 0) {
      if (message) message += ' ';
      message += `My dealbreakers include ${formData.dealBreakers.slice(0, 2).join(" and ")}.`;
    }
    
    return message || "I'm open to all kinds of connections!";
  }

  // Generate message about values
  const generateValuesMessage = () => {
    let message = '';
    
    if (formData.coreValues && formData.coreValues.length > 0) {
      message += `My core values are ${formData.coreValues.slice(0, 3).join(", ")}.`;
    }
    
    if (formData.spirituality) {
      if (message) message += ' ';
      message += `In terms of spirituality, I identify as ${formData.spirituality}.`;
    }
    
    return message || "I value authentic connections and honesty.";
  }

  const simulateTyping = (message: string) => {
    setIsTyping(true);

    // Clear previous message
    setPreviewMessage("");

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setPreviewMessage(message);

      // Add to message history
      setMessages((prev) => [...prev, { content: message, isAi: true }]);
    }, 1500);
  }

  // Handle user input submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const userMessage = userInput.trim();
    setMessages(prev => [...prev, { content: userMessage, isAi: false }]);
    setUserInput('');
    
    // Generate AI response based on user input
    setTimeout(() => {
      let response = '';
      
      // Check for keywords in user message and respond with appropriate information
      const normalizedInput = userMessage.toLowerCase();
      
      if (normalizedInput.includes('about') || normalizedInput.includes('who are you') || normalizedInput.includes('yourself')) {
        response = generateAboutMessage();
      } 
      else if (normalizedInput.includes('relationship') || normalizedInput.includes('looking for') || normalizedInput.includes('dating')) {
        response = generateRelationshipMessage();
      }
      else if (normalizedInput.includes('value') || normalizedInput.includes('believe') || normalizedInput.includes('important')) {
        response = generateValuesMessage();
      }
      else if (normalizedInput.includes('hobby') || normalizedInput.includes('interest') || normalizedInput.includes('like to do')) {
        response = `My interests include ${formData.interests.length > 0 ? formData.interests.slice(0, 3).join(", ") : "various activities"} and I enjoy ${formData.hobbies.length > 0 ? formData.hobbies.slice(0, 2).join(" and ") : "spending time with interesting people"}.`;
      }
      else if (normalizedInput.includes('age') || normalizedInput.includes('old')) {
        response = formData.age ? `I'm ${formData.age} years old.` : "I prefer not to share my exact age.";
      }
      else if (normalizedInput.includes('location') || normalizedInput.includes('live') || normalizedInput.includes('from')) {
        response = formData.location ? `I'm from ${formData.location}.` : "I prefer not to share my exact location for privacy reasons.";
      }
      else if (normalizedInput.includes('job') || normalizedInput.includes('work') || normalizedInput.includes('occupation')) {
        response = formData.occupation ? `I work as a ${formData.occupation}.` : "I prefer not to discuss my exact occupation.";
      }
      else if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('hey')) {
        response = `Hi there! It's nice to meet you. I'm ${formData.name}'s AI twin. How can I help you today?`;
      }
      else {
        response = `Thanks for your message! As ${formData.name}'s AI twin, I'm still learning. Could you ask me about my interests, values, or relationship preferences?`;
      }
      
      simulateTyping(response);
    }, 1000);
  };

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-[2rem] border border-pink-200 p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">AI Twin Preview</h2>
        </div>
        
        {/* Add Verida Badge if data exists */}
        {veridaStatus === 'loaded' && (
          <Badge 
            variant="outline" 
            className="bg-green-50 text-green-700 border-green-200 px-3 py-1 flex items-center gap-1"
          >
            <Database className="h-3 w-3 mr-1" />
            Verida Data Loaded
          </Badge>
        )}
        
        {/* Add Record Status Badge */}
        {formData._id && (
          <Badge 
            variant="outline" 
            className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 flex items-center gap-1 ml-2"
          >
            <Database className="h-3 w-3 mr-1" />
            Existing Record
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-14 w-14 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="AI Twin" />
          <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white">
            {formData.name ? formData.name.substring(0, 2).toUpperCase() : "AI"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            {formData.name || "Your AI Twin"}
            <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 text-xs">
              AI Twin
            </Badge>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-1">
            {formData.bio
              ? `${formData.bio.substring(0, 50)}${formData.bio.length > 50 ? "..." : ""}`
              : "Your digital representative"}
          </p>
        </div>
      </div>

      {/* Chat container with fixed height and scrolling */}
      <div
        className="flex-1 bg-white/80 rounded-xl border border-pink-100 p-4 mb-4 flex flex-col overflow-hidden"
        style={{ minHeight: "350px", maxHeight: "350px" }}
      >
        <div 
          className="overflow-y-auto flex-1 space-y-4 pr-1"
          style={{ 
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(236, 72, 153, 0.3) transparent",
            msOverflowStyle: "none"
          }}
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${!msg.isAi ? "justify-end" : ""}`}>
              {msg.isAi && (
                <Avatar className="h-8 w-8 border-2 border-white flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-xs">
                    {formData.name ? formData.name.substring(0, 2).toUpperCase() : "AI"}
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
                    <span className="text-xs text-pink-200">AI Twin</span>
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
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
                  {formData.name ? formData.name.substring(0, 2).toUpperCase() : "AI"}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] shadow-sm">
                <div className="flex items-center gap-1 mb-1">
                  <Bot className="h-3 w-3 text-pink-200" />
                  <span className="text-xs text-pink-200">AI Twin</span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div
                    className="h-2 w-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        
      {/* Chat input section */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-auto">
        <Input
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 bg-white border-pink-100 focus:border-pink-300"
          disabled={!formData.name}
        />
        <Button 
          type="submit" 
          disabled={!formData.name || !userInput.trim()}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}


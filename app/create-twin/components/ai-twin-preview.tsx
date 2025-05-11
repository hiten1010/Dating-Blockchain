"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Bot, User, RefreshCw, Sparkles, Database } from "lucide-react"

interface AiTwinPreviewProps {
  formData: any
}

export default function AiTwinPreview({ formData }: AiTwinPreviewProps) {
  const [previewMessage, setPreviewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isAi: boolean }[]>([])
  const [insightVisible, setInsightVisible] = useState(false)
  const [veridaStatus, setVeridaStatus] = useState<'loading' | 'loaded' | 'none'>('none')

  // Check for Verida data
  useEffect(() => {
    if (formData.name && formData.favouriteType) {
      setVeridaStatus('loaded');
    }
  }, [formData]);

  // Generate a preview message based on form data
  useEffect(() => {
    generatePreviewMessage()
  }, [formData])

  const generatePreviewMessage = () => {
    // Only generate if we have some basic data
    if (!formData.name) return

    const messages = [
      `Hi there! I'm ${formData.name}'s AI twin.`,
      `I'm here to represent ${formData.name} in conversations when they're busy.`,
      formData.interests.length > 0
        ? `I share ${formData.name}'s interests like ${formData.interests.join(", ")}.`
        : `I share ${formData.name}'s various interests and passions.`,
      formData.communicationStyle
        ? `My communication style is ${formData.communicationStyle} and I have a ${formData.humorStyle || "balanced"} sense of humor.`
        : `I communicate just like ${formData.name} would.`,
      formData.relationshipGoals
        ? `I'm looking for ${formData.relationshipGoals}.`
        : `I'm looking for meaningful connections.`,
      formData.personalityTraits.length > 0
        ? `My personality is ${formData.personalityTraits.slice(0, 3).join(", ")}.`
        : `I have ${formData.name}'s unique personality.`,
      `Let's chat and see if we connect!`,
    ]

    // Pick a random message for the preview
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    simulateTyping(randomMessage)
  }

  const simulateTyping = (message: string) => {
    setIsTyping(true)

    // Clear previous message
    setPreviewMessage("")

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
      setPreviewMessage(message)

      // Add to message history
      setMessages((prev) => [...prev, { content: message, isAi: true }])

      // Show insight after a delay
      setTimeout(() => {
        setInsightVisible(true)
      }, 1000)
    }, 1500)
  }

  const handleSendTestMessage = () => {
    const testMessages = [
      "Hi there! What are your interests?",
      "Tell me more about yourself.",
      "What kind of relationship are you looking for?",
      "What do you like to do for fun?",
      "What's your ideal first date?",
    ]

    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)]

    // Add user message
    setMessages((prev) => [...prev, { content: randomMessage, isAi: false }])

    // Hide insight
    setInsightVisible(false)

    // Generate AI response
    generatePreviewMessage()
  }

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
            <RefreshCw className="h-3 w-3 mr-1" />
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
        className="flex-1 bg-white/80 rounded-xl border border-pink-100 p-4 mb-4 overflow-hidden flex flex-col"
        style={{ maxHeight: "350px", height: "350px" }}
      >
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
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

          {insightVisible && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-3 border border-indigo-100"
            >
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-medium text-indigo-700 mb-1">AI Twin Insight</h4>
                  <p className="text-xs text-indigo-600">
                    {formData.name
                      ? `This AI twin will represent ${formData.name} based on`
                      : "This AI twin will represent you based on"}{" "}
                    the detailed personal information provided.
                    {formData.personalityTraits.length > 0 &&
                      ` It will reflect ${formData.name || "your"} ${formData.personalityTraits.slice(0, 2).join(", ")} personality.`}
                    {formData.communicationStyle && ` Communication will be ${formData.communicationStyle}.`}
                    {formData.aiConfidentiality.length > 0 && ` Confidential information will be protected.`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add Verida Storage Information */}
          {formData.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100"
            >
              <div className="flex items-start gap-2">
                <Database className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-medium text-purple-700 mb-1">Verida Storage</h4>
                  <p className="text-xs text-purple-600">
                    Your AI twin will be stored securely using the Verida Favourite schema with 
                    type: <span className="font-medium">{formData.favouriteType || "recommendation"}</span>,
                    content: <span className="font-medium">{formData.contentType || "document"}</span>
                    {formData.uri && (
                      <>, uri: <span className="font-medium">{formData.uri}</span></>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button
          variant="outline"
          className="flex-1 bg-white border-pink-200 hover:bg-pink-50 text-pink-700"
          onClick={generatePreviewMessage}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Preview
        </Button>

        <Button
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          onClick={handleSendTestMessage}
        >
          <User className="h-4 w-4 mr-2" />
          Test Message
        </Button>
      </div>

      {/* Add Document ID info at the bottom if it exists */}
      {formData._id && (
        <div className="mt-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-start gap-2">
            <Database className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-medium text-slate-700 mb-1">Record Information</h4>
              <p className="text-xs text-slate-600">
                ID: <span className="font-mono text-[10px]">{formData._id}</span>
                {formData._rev && <> • Rev: {formData._rev.split('-')[0]}</>}
                {formData.uri && <> • URI: {formData.uri.substring(0, 20)}...</>}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


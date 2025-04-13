"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AiTwinCreationForm from "./components/ai-twin-creation-form"
import AiTwinPreview from "./components/ai-twin-preview"
import { Shield, Lock, Sparkles } from "lucide-react"

export default function CreateAiTwinPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal details
    name: "",
    age: "",
    location: "",
    occupation: "",
    bio: "",

    // Life story
    childhood: "",
    significantEvents: [] as string[],
    achievements: [] as string[],
    challenges: [] as string[],
    lifePhilosophy: "",

    // Personality
    personalityTraits: [] as string[],
    communicationStyle: "",
    humorStyle: "",
    emotionalResponses: [] as { situation: string; response: string }[],
    decisionMakingStyle: "",

    // Interests
    interests: [] as string[],
    hobbies: [] as string[],
    expertise: [] as string[],
    specificLikes: [] as string[],
    specificDislikes: [] as string[],

    // Relationship preferences
    relationshipGoals: "",
    dealBreakers: [] as string[],
    lookingFor: [] as string[],
    pastRelationships: "",
    attachmentStyle: "",

    // Values
    coreValues: [] as string[],
    beliefs: [] as string[],
    politicalViews: "",
    spirituality: "",

    // Conversation preferences
    conversationTopics: [] as string[],
    avoidTopics: [] as string[],
    communicationPatterns: [] as string[],
    typicalPhrases: [] as string[],

    // AI behavior
    aiResponseStyle: "",
    aiProactiveness: 50,
    aiPersonality: "",
    aiConfidentiality: [] as string[],
  })

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 8))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 text-slate-800 overflow-hidden">
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

        {/* Floating binary elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-500 opacity-10 font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 1 + 0.8}rem`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAxMjgsIDE3MCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Replace the current header section (lines 76-96) with this improved design */}
        <div className="relative mb-12">
          {/* Decorative background elements */}
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-r from-pink-200/30 to-rose-200/30 blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl"></div>

          {/* Header content */}
          <div className="relative backdrop-blur-xl bg-white/40 rounded-[2rem] border border-pink-200 p-8 shadow-xl text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
              Create Your AI Twin
            </h1>

            <div className="mt-4 max-w-2xl mx-auto">
              <p className="text-lg text-slate-600">
                Share your personal story and details so your AI twin can truly understand and represent you. The more
                you share, the more authentic your AI twin will be.
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-full px-6 py-3 border border-indigo-100 max-w-xl mx-auto">
              <Shield className="h-5 w-5 text-indigo-500 flex-shrink-0" />
              <p className="text-sm text-indigo-700">
                All your personal data is securely stored in your Verida wallet and never shared without your consent
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AiTwinCreationForm
              currentStep={currentStep}
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </motion.div>

          {/* Preview Section */}
          <motion.div
            className="lg:col-span-1 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 flex flex-col">
              <AiTwinPreview formData={formData} />
            </div>

            {/* Security Information */}
            <div className="mt-6 backdrop-blur-sm bg-white/60 rounded-xl border border-indigo-100 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-indigo-100">
                  <Lock className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Your Data is Secure</h3>
                  <p className="text-sm text-slate-600">
                    All your personal information is encrypted and stored in your Verida wallet. Your AI twin accesses
                    this data securely without exposing it to third parties. You maintain complete control over your
                    information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-100px) rotate(10deg);
          }
          100% {
            transform: translateY(-200px) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}


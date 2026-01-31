'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  MessageSquare,
  Send,
  ArrowLeft,
  User,
  Bot
} from 'lucide-react'

const SHOP_NAME = 'The Coffee Nook'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sample responses based on keywords
  const getSampleResponse = (query: string): string => {
    const lower = query.toLowerCase()
    
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
      return "We're open Mon-Fri 7am-7pm, and Sat-Sun 8am-5pm. Hope to see you soon!"
    }
    if (lower.includes('wifi') || lower.includes('password')) {
      return "Yes, we have free wifi! The password is 'espresso_shots'."
    }
    if (lower.includes('park')) {
      return "Great question! We have free parking in the back lot, spots 12-20 are reserved for customers."
    }
    if (lower.includes('refund') || lower.includes('exchange')) {
      return "Our refund policy: No refunds on consumed food, but we do exchanges within 10 minutes of purchase."
    }
    
    return "I'd be happy to help! Try asking me about our hours, wifi, parking, or refund policy."
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = { role: 'bot', text: getSampleResponse(input) }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Back to Dashboard Button */}
      <Link href="/" className="fixed top-6 left-6 w-10 h-10 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Chat Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[90vh] max-h-[800px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Chat with {SHOP_NAME}</h1>
            <p className="text-sm text-indigo-100">Always here to help</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-slate-200' 
                    : 'bg-indigo-100'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-slate-100 text-slate-900 rounded-tl-sm'
                }`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex space-x-2 px-4 py-2 bg-slate-100 rounded-lg rounded-tl-sm">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-slate-50 border-t border-slate-200 p-4">
          <div className="flex items-end space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about hours, wifi, parking..."
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Press Enter to send</p>
        </div>
      </div>
    </div>
  )
}

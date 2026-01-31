'use client'

import { useState } from 'react'
import { 
  Store, 
  MessageSquare, 
  Sparkles, 
  RefreshCw,
  User,
  Bot
} from 'lucide-react'

export default function Dashboard() {
  const [knowledge, setKnowledge] = useState(`We are 'The Coffee Nook'.
Hours: Mon-Fri 7am-7pm, Sat-Sun 8am-5pm.
Wifi Password: 'espresso_shots'.
Parking: Free parking in the back lot, spots 12-20.
Refund Policy: No refunds on consumed food. Exchanges only within 10 mins.`)
  
  const [syncing, setSyncing] = useState(false)
  const [aiStatus, setAiStatus] = useState<'online' | 'syncing'>('online')

  const handleUpdate = () => {
    setSyncing(true)
    setAiStatus('syncing')
    
    // Simulate AI update
    setTimeout(() => {
      setSyncing(false)
      setAiStatus('online')
    }, 2000)
  }

  // Sample chat messages
  const chatMessages = [
    { role: 'customer', text: 'What are your opening hours?' },
    { role: 'bot', text: 'We\'re open Mon-Fri 7am-7pm, and Sat-Sun 8am-5pm.' },
    { role: 'customer', text: 'Do you have wifi?' },
    { role: 'bot', text: 'Yes! Our wifi password is \'espresso_shots\'.' },
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 space-y-8">
        {/* Logo */}
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        
        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            <Store className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane - The Brain */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold text-slate-900">AI Configuration</h1>
                {aiStatus === 'online' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    AI Online
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                    Syncing
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm">Train your AI assistant with business knowledge</p>
            </div>

            {/* Knowledge Base Card */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="p-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Business Knowledge
                </label>
                <textarea
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  className="w-full h-96 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono"
                  placeholder="Paste your business hours, policies, FAQs, menu items, parking info, etc."
                />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    {knowledge.length} characters
                  </p>
                  <button
                    onClick={handleUpdate}
                    disabled={syncing}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {syncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Update AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-900 mb-2">💡 Tips for better results</h3>
              <ul className="text-xs text-indigo-700 space-y-1">
                <li>• Include specific details like hours, prices, and policies</li>
                <li>• Use clear, structured information (bullet points work great)</li>
                <li>• Update regularly to keep your AI current</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Pane - The Preview */}
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col">
          {/* Preview Header */}
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Live Preview</h2>
            <p className="text-xs text-slate-500">Customer chat interface</p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-sm mx-auto">
              {/* Mobile Frame */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                {/* Mobile Header */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">No-Wait Assistant</h3>
                    <p className="text-xs text-green-600">● Online</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 bg-white min-h-96">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'customer' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'customer' 
                            ? 'bg-slate-200' 
                            : 'bg-indigo-100'
                        }`}>
                          {message.role === 'customer' ? (
                            <User className="w-3.5 h-3.5 text-slate-600" />
                          ) : (
                            <Bot className="w-3.5 h-3.5 text-indigo-600" />
                          )}
                        </div>
                        <div className={`px-3 py-2 rounded-lg text-sm ${
                          message.role === 'customer'
                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                            : 'bg-slate-100 text-slate-900 rounded-tl-sm'
                        }`}>
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <div className="flex items-center space-x-2 bg-white rounded-lg border border-slate-200 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="flex-1 text-sm bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
                      disabled
                    />
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

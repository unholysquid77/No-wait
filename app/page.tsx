'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Store,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'

const SHOP_NAME = 'The Coffee Nook'

export default function Dashboard() {
  const [knowledge, setKnowledge] = useState(`We are 'The Coffee Nook'.
Hours: Mon-Fri 7am-7pm, Sat-Sun 8am-5pm.
Wifi Password: 'espresso_shots'.
Parking: Free parking in the back lot, spots 12-20.
Refund Policy: No refunds on consumed food. Exchanges only within 10 mins.`)

  const [syncing, setSyncing] = useState(false)
  const [aiStatus, setAiStatus] = useState<'online' | 'syncing'>('online')
  const [copied, setCopied] = useState(false)

  const handleUpdate = () => {
    setSyncing(true)
    setAiStatus('syncing')

    // Simulate AI update
    setTimeout(() => {
      setSyncing(false)
      setAiStatus('online')
    }, 2000)
  }

  const handleCopyLink = () => {
    const chatLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/chat`
    navigator.clipboard.writeText(chatLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            <Store className="w-5 h-5" />
          </Link>
          <Link href="/chat" className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl">
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
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleCopyLink}
                      className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all shadow-sm flex items-center space-x-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Chat Link</span>
                        </>
                      )}
                    </button>
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
      </main>
    </div>
  )
}

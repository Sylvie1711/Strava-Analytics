'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function RAGChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Send message to RAG
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get stravaId from URL params
      const searchParams = new URLSearchParams(window.location.search);
      const stravaId = searchParams.get('stravaId');

      if (!stravaId) {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Please connect your Strava account first to use the AI coach.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/rag/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input,
          stravaId: stravaId
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'Sorry, I could not process your question.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl mr-3">
              🏃
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Strava AI Coach</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your personal running coach, powered by your activity data
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                  💬
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ask about your running!</h3>
                <p className="text-gray-600 mb-6">
                  I can help with training, pacing, recovery, and performance
                </p>
                <div className="space-y-2 max-w-md mx-auto text-left">
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
                    <strong>💡 Try:</strong> "How was my pace this month?"
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
                    <strong>💡 Try:</strong> "Am I improving on longer runs?"
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
                    <strong>💡 Try:</strong> "What's my typical running pattern?"
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === 'user' ? 'order-2' : 'order-1'
                      }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-50 text-gray-900 border border-gray-200'
                        }`}
                      >
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white order-1 ml-2' 
                        : 'bg-gray-200 text-gray-600 order-2 mr-2'
                    }`}>
                      {message.role === 'user' ? 'You' : '🏃'}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mr-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                      🏃
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                placeholder="Ask about your running, training, or performance..."
                className="flex-1 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm min-w-[80px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>This AI coach analyzes your recent Strava activities to provide personalized training advice.</p>
          <p className="mt-1">For best results, ensure your Strava account is connected and activities are up to date.</p>
        </div>
      </div>
    </div>
  );
}

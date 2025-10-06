'use client'

import { useEffect, useRef } from 'react'
import { useChat } from '@/contexts/chat-context'
import { MessageBubble } from './message-bubble'
import { MessageInput } from './message-input'
import { useChat as useChatHook } from '@/hooks/use-chat'

export function ChatInterface() {
  const { state, dispatch } = useChat()
  const { sendMessage, isLoading } = useChatHook()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.messages])

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      timestamp: new Date(),
    }

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage })

    try {
      const response = await sendMessage(content)
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant' as const,
        timestamp: new Date(),
      }

      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage })
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant' as const,
        timestamp: new Date(),
      }
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h3 className="text-xl font-semibold mb-2">Hello! I'm Lily Rose</h3>
              <p>Start a conversation or tap the microphone for voice chat</p>
            </div>
          </div>
        ) : (
          state.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={isLoading}
      />
    </div>
  )
}
'use client'

import React, { createContext, useContext, useReducer } from 'react'
import { Message } from '@/types'

interface ChatState {
  messages: Message[]
  isProcessing: boolean
  currentConversation: Message[]
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'CLEAR_CONVERSATION' }
  | { type: 'LOAD_MESSAGES'; payload: Message[] }

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        currentConversation: [...state.currentConversation, action.payload],
      }
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload }
    case 'CLEAR_CONVERSATION':
      return { ...state, currentConversation: [] }
    case 'LOAD_MESSAGES':
      return { ...state, messages: action.payload }
    default:
      return state
  }
}

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    isProcessing: false,
    currentConversation: [],
  })

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
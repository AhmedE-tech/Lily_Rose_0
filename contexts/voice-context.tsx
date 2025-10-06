'use client'

import React, { createContext, useContext, useReducer } from 'react'

interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  error?: string
}

type VoiceAction =
  | { type: 'START_LISTENING' }
  | { type: 'STOP_LISTENING' }
  | { type: 'START_SPEAKING' }
  | { type: 'STOP_SPEAKING' }
  | { type: 'SET_TRANSCRIPT'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET' }

const voiceReducer = (state: VoiceState, action: VoiceAction): VoiceState => {
  switch (action.type) {
    case 'START_LISTENING':
      return { ...state, isListening: true, error: undefined }
    case 'STOP_LISTENING':
      return { ...state, isListening: false }
    case 'START_SPEAKING':
      return { ...state, isSpeaking: true }
    case 'STOP_SPEAKING':
      return { ...state, isSpeaking: false }
    case 'SET_TRANSCRIPT':
      return { ...state, transcript: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isListening: false, isSpeaking: false }
    case 'CLEAR_ERROR':
      return { ...state, error: undefined }
    case 'RESET':
      return { isListening: false, isSpeaking: false, transcript: '', error: undefined }
    default:
      return state
  }
}

interface VoiceContextType {
  state: VoiceState
  dispatch: React.Dispatch<VoiceAction>
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(voiceReducer, {
    isListening: false,
    isSpeaking: false,
    transcript: '',
  })

  return (
    <VoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
}
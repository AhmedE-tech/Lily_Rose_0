export interface User {
  id: string
  email: string
  created_at: string
}

export interface Conversation {
  id: string
  user_id: string
  user_input: string
  ai_response: string
  emotion?: string
  intent?: string
  created_at: string
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  emotion?: string
}

export interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  error?: string
}

export interface NLPAnalysis {
  emotion: string
  intent: 'greeting' | 'question' | 'command' | 'express_emotion' | 'ask_about_ai' | 'chat'
}
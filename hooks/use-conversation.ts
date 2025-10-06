import { useState, useEffect } from 'react'
import { Conversation } from '@/types'
import { useAuth } from './use-auth'

export function useConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadConversations()
    }
  }, [user])

  const loadConversations = async () => {
    try {
      const response = await fetch(`/api/chat/get-history?userId=${user?.id}&limit=100`)
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Failed to load conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const addConversation = (conversation: Conversation) => {
    setConversations(prev => [...prev, conversation])
  }

  const clearConversations = () => {
    setConversations([])
  }

  return {
    conversations,
    loading,
    addConversation,
    clearConversations,
    refresh: loadConversations
  }
}
import { useState, useCallback } from 'react'
import { useAuth } from './use-auth'

export function useChat() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const sendMessage = useCallback(async (content: string) => {
    if (!user) throw new Error('User not authenticated')
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, userId: user.id }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      return data.response
    } finally {
      setIsLoading(false)
    }
  }, [user])

  return { sendMessage, isLoading }
}
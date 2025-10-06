'use client'

import { useAuth } from '@/contexts/auth-context'
import { ChatInterface } from '@/components/chat/chat-interface'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <ChatInterface />
}
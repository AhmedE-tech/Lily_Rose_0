'use client'

import { useEffect, useState } from 'react'
import { Conversation } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, History } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export function ChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadHistory()
    }
  }, [user])

  const loadHistory = async () => {
    try {
      const response = await fetch(`/api/chat/get-history?userId=${user?.id}&limit=50`)
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Failed to load history:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = async () => {
    // This would need a proper API endpoint to clear history
    // For now, just clear locally
    setConversations([])
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <History className="h-4 w-4 mr-2" />
          Recent Conversations
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          disabled={conversations.length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {conversations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No conversation history yet
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {conversations.slice(-10).map((conv) => (
              <div
                key={conv.id}
                className="p-2 rounded-lg bg-secondary/50 border border-border text-xs"
              >
                <p className="font-medium truncate">{conv.user_input}</p>
                <p className="text-muted-foreground truncate">{conv.ai_response}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(conv.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
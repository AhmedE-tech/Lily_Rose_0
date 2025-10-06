'use client'

import { Message } from '@/types'
import { formatTime } from '@/utils/helpers'
import { cn } from '@/utils/helpers'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      'flex w-full mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl',
        isUser 
          ? 'bg-primary text-primary-foreground rounded-br-none' 
          : 'bg-secondary text-secondary-foreground rounded-bl-none'
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={cn(
          'text-xs mt-1',
          isUser ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'
        )}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}
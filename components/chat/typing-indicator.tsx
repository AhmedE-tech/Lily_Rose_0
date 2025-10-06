import { cn } from '@/utils/helpers'

interface TypingIndicatorProps {
  isTyping?: boolean
  className?: string
}

export function TypingIndicator({ isTyping = true, className }: TypingIndicatorProps) {
  if (!isTyping) return null

  return (
    <div className={cn('flex space-x-1 items-center', className)}>
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-sm text-muted-foreground ml-2">Lily is typing...</span>
    </div>
  )
}
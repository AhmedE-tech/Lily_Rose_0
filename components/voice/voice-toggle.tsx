'use client'

import { Button } from '@/components/ui/button'
import { Mic, Square } from 'lucide-react'
import { cn } from '@/utils/helpers'

interface VoiceToggleProps {
  isListening: boolean
  onStartListening: () => void
  onStopListening: () => void
  disabled?: boolean
  className?: string
}

export function VoiceToggle({
  isListening,
  onStartListening,
  onStopListening,
  disabled,
  className
}: VoiceToggleProps) {
  return (
    <Button
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={isListening ? onStopListening : onStartListening}
      disabled={disabled}
      className={cn(
        'transition-all duration-300',
        isListening && 'animate-pulse',
        className
      )}
    >
      {isListening ? (
        <Square className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  )
}
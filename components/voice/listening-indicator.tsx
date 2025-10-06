'use client'

import { cn } from '@/utils/helpers'

interface ListeningIndicatorProps {
  isListening: boolean
  isProcessing: boolean
  transcript: string
}

export function ListeningIndicator({ 
  isListening, 
  isProcessing, 
  transcript 
}: ListeningIndicatorProps) {
  return (
    <div className="text-center space-y-4 max-w-md">
      {/* Status Indicator */}
      <div className={cn(
        'text-lg font-semibold transition-all duration-300',
        isProcessing 
          ? 'text-yellow-400 animate-pulse' 
          : isListening 
            ? 'text-green-400' 
            : 'text-muted-foreground'
      )}>
        {isProcessing 
          ? 'Thinking...' 
          : isListening 
            ? 'Listening...' 
            : 'Ready to listen'
        }
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">You said:</p>
          <p className="text-lg text-foreground">{transcript}</p>
        </div>
      )}

      {/* Pulse Animation */}
      {isListening && !isProcessing && (
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-2 bg-green-400 rounded-full animate-bounce-slow',
                i === 2 && 'animation-delay-100',
                i === 3 && 'animation-delay-200'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utils/helpers'

interface VoiceVisualizerProps {
  isListening: boolean
}

export function VoiceVisualizer({ isListening }: VoiceVisualizerProps) {
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    if (!isListening) {
      setHeights([])
      return
    }

    const interval = setInterval(() => {
      const newHeights = Array.from({ length: 15 }, () => 
        Math.random() * 60 + 10
      )
      setHeights(newHeights)
    }, 100)

    return () => clearInterval(interval)
  }, [isListening])

  return (
    <div className="flex items-end justify-center space-x-1 h-32">
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            'w-2 bg-gradient-to-t from-primary to-purple-400 rounded-full transition-all duration-300',
            isListening ? 'opacity-100' : 'opacity-0'
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}
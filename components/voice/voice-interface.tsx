'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { VoiceVisualizer } from './voice-visualizer'
import { ListeningIndicator } from './listening-indicator'
import { useSpeechRecognition } from '@/hooks/use-speech-recognition'
import { useChat } from '@/hooks/use-chat'
import { ArrowLeft, Mic, Square } from 'lucide-react'

export function VoiceInterface() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition()
  const { sendMessage } = useChat()

  useEffect(() => {
    // Auto-start listening when entering voice interface
    startListening()
  }, [startListening])

  const handleStopListening = async () => {
    stopListening()
    
    if (transcript.trim()) {
      setIsProcessing(true)
      try {
        const response = await sendMessage(transcript)
        // Play TTS response
        await playTTS(response)
      } catch (error) {
        console.error('Error processing voice message:', error)
      } finally {
        setIsProcessing(false)
        resetTranscript()
        // Restart listening after response
        setTimeout(() => startListening(), 1000)
      }
    } else {
      resetTranscript()
      startListening()
    }
  }

  const playTTS = async (text: string) => {
    try {
      const response = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error('TTS failed')

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      
      await audio.play()
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
      }
    } catch (error) {
      console.error('TTS Error:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Visualizer */}
        <VoiceVisualizer isListening={isListening} />

        {/* Listening Indicator */}
        <ListeningIndicator 
          isListening={isListening}
          isProcessing={isProcessing}
          transcript={transcript}
        />

        {/* Controls */}
        <div className="flex flex-col items-center space-y-4">
          {isListening ? (
            <Button
              onClick={handleStopListening}
              size="lg"
              className="rounded-full h-20 w-20 bg-red-500 hover:bg-red-600"
            >
              <Square className="h-8 w-8" />
            </Button>
          ) : (
            <Button
              onClick={startListening}
              size="lg"
              disabled={isProcessing}
              className="rounded-full h-20 w-20 bg-primary hover:bg-primary/90"
            >
              <Mic className="h-8 w-8" />
            </Button>
          )}
          
          <p className="text-sm text-muted-foreground text-center">
            {isProcessing 
              ? 'Processing...' 
              : isListening 
                ? 'Tap to stop listening' 
                : 'Tap to start listening'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
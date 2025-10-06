import { useState, useCallback } from 'react'
import { TextToSpeech } from '@/lib/tts'

export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string>('')

  const speak = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true)
      setError('')

      const tts = new TextToSpeech()
      const audioBuffer = await tts.synthesize(text)
      
      const audioContext = new AudioContext()
      const audioBufferSource = audioContext.createBufferSource()
      const decodedData = await audioContext.decodeAudioData(audioBuffer)
      
      audioBufferSource.buffer = decodedData
      audioBufferSource.connect(audioContext.destination)
      audioBufferSource.start()

      return new Promise<void>((resolve) => {
        audioBufferSource.onended = () => {
          setIsSpeaking(false)
          resolve()
        }
      })
    } catch (err: any) {
      setError(err.message)
      setIsSpeaking(false)
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    // This would need to track and stop all audio contexts
    setIsSpeaking(false)
  }, [])

  return {
    isSpeaking,
    error,
    speak,
    stopSpeaking
  }
}
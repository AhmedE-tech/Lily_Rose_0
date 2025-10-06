export class TextToSpeech {
  private apiKey: string
  private voiceId: string

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY!
    this.voiceId = process.env.ELEVENLABS_VOICE_ID || 'jenKdO4Y1rvPPeYfP8Rp' // Fallback
  }

  async synthesize(text: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`ElevenLabs TTS error: ${response.statusText}`)
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error('TTS Error:', error)
      throw error
    }
  }

  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    const audioContext = new AudioContext()
    const audioBufferSource = audioContext.createBufferSource()
    
    const decodedData = await audioContext.decodeAudioData(audioBuffer)
    audioBufferSource.buffer = decodedData
    audioBufferSource.connect(audioContext.destination)
    audioBufferSource.start()
    
    return new Promise((resolve) => {
      audioBufferSource.onended = () => resolve()
    })
  }
}
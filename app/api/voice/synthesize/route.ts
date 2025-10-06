import { NextResponse } from 'next/server'
import { TextToSpeech } from '@/lib/tts'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const tts = new TextToSpeech()
    const audioBuffer = await tts.synthesize(text)

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    })
  } catch (error: any) {
    console.error('TTS error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
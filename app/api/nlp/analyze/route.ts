import { NextResponse } from 'next/server'
import { NLPAnalyzer } from '@/lib/nlp-analyzer'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const analyzer = new NLPAnalyzer()
    const analysis = await analyzer.analyze(text)

    return NextResponse.json(analysis)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
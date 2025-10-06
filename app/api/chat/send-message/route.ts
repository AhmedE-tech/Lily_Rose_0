import { NextResponse } from 'next/server'
import { OrganicBrain } from '@/lib/brain'

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json()

    if (!message || !userId) {
      return NextResponse.json({ error: 'Message and userId are required' }, { status: 400 })
    }

    const brain = new OrganicBrain(userId)
    const response = await brain.chat(message)

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
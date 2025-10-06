import { supabase } from './supabase/client'

export interface Conversation {
  id: string
  user_input: string
  ai_response: string
  emotion?: string
  intent?: string
  created_at: string
}

export interface UserMemory {
  user_name?: string
  last_mood?: string
  [key: string]: any
}

export class CrystalMemory {
  private userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  async store(userInput: string, aiResponse: string, analysis?: { emotion?: string; intent?: string }) {
    // Extract user name if mentioned
    if (userInput.toLowerCase().includes('my name is')) {
      const name = userInput.split('my name is')[-1].split()[0]
      await this.updateMemory('user_name', name)
    }

    // Detect emotional keywords
    const emotionalWords = {
      happy: ['joy', 'love', 'laugh', 'happy', 'excited'],
      sad: ['lonely', 'hurt', 'cry', 'sad', 'depressed']
    }

    for (const [mood, keywords] of Object.entries(emotionalWords)) {
      if (keywords.some(kw => userInput.toLowerCase().includes(kw))) {
        await this.updateMemory('last_mood', mood)
      }
    }

    // Store conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: this.userId,
        user_input: userInput,
        ai_response: aiResponse,
        emotion: analysis?.emotion,
        intent: analysis?.intent
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getConversations(limit: number = 200): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', this.userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data?.reverse() || []
  }

  async getMemory(): Promise<UserMemory> {
    const { data, error } = await supabase
      .from('user_memory')
      .select('key, value')
      .eq('user_id', this.userId)

    if (error) throw error

    const memory: UserMemory = {}
    data?.forEach(item => {
      memory[item.key] = item.value
    })
    return memory
  }

  async updateMemory(key: string, value: string) {
    const { error } = await supabase
      .from('user_memory')
      .upsert({
        user_id: this.userId,
        key,
        value
      })

    if (error) throw error
  }

  async getUserName(): Promise<string | undefined> {
    const memory = await this.getMemory()
    return memory.user_name
  }
}
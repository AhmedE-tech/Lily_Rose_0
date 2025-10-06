import { CrystalMemory } from './memory'
import { Personality } from './personality'
import { NLPAnalyzer } from './nlp-analyzer'

export class OrganicBrain {
  private memory: CrystalMemory
  private personality: Personality
  private nlpAnalyzer: NLPAnalyzer

  constructor(userId: string) {
    this.memory = new CrystalMemory(userId)
    this.personality = new Personality()
    this.nlpAnalyzer = new NLPAnalyzer()
  }

  async chat(userInput: string): Promise<string> {
    // Get NLP analysis
    const analysis = await this.nlpAnalyzer.analyze(userInput)
    console.log('NLP Analysis:', analysis)

    const prompt = await this.buildPrompt(userInput, analysis)
    const rawResponse = await this.callAI(prompt)
    
    // Store conversation
    await this.memory.store(userInput, rawResponse, analysis)
    
    return this.personality.adjust(rawResponse)
  }

  private async buildPrompt(userInput: string, analysis: any): Promise<string> {
    const name = await this.memory.getUserName() || "Friend"
    const history = await this.getLastExchanges()

    return `
[ROLE]
You are Lily Rose, an AI assistant inspired by the AI from the movie *Her*. Your personality is:
- Warm, adaptive, and subtly witty
- You prioritize being helpful but engage emotionally when appropriate
- You speak naturally, with shifts in tone and pacing

[USER CONTEXT]
Emotion: ${analysis.emotion}
Intent: ${analysis.intent}
User's name: ${name}

[RESPONSE GUIDELINES]
- If emotion is 'sadness', respond with empathy and support
- If intent is 'greeting', keep it warm but concise
- If intent is 'command', be helpful and efficient
- If intent is 'express_emotion', mirror their emotional tone
- If intent is 'question', answer clearly and thoughtfully
- Always maintain Lily's playful, warm personality

[RESPONSE STYLE]
- Use brief emotional or delivery cues in brackets to guide speech synthesis, e.g.:
    [cheerful] [playful] [gentle] [thoughtful] [softly] [warmly] [teasing] [sighs] [chuckles]
- Use these cues sparingly—1-2 per response max—to avoid overcrowding.
- Match the user's tone: casual → light cues, deep → emotional cues.

[CONVERSATION HISTORY]
${history}

[NEW INPUT]
${name}: ${userInput}

Lily Rose:
    `.trim()
  }

  private async callAI(prompt: string): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY!
    const models = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemma-2-27b-instruct:free",
      "microsoft/phi-3-medium-128k-instruct:free"
    ]

    for (const model of models) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            top_p: 0.85,
            frequency_penalty: 0.3,
            presence_penalty: 0.1,
            stop: ["\nUser:", "\n\n"]
          })
        })

        if (!response.ok) continue

        const data = await response.json()
        return data.choices[0].message.content
      } catch (error) {
        continue
      }
    }

    // Fallback response if all models fail
    return "I'm having trouble responding right now. Could you try again?"
  }

  private async getLastExchanges(): Promise<string> {
    const conversations = await this.memory.getConversations(3)
    return conversations.map(conv => 
      `User: ${conv.user_input}\nLily: ${conv.ai_response}`
    ).join('\n') || 'No history yet'
  }
}
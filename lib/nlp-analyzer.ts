export interface NLPAnalysis {
  emotion: string
  intent: 'greeting' | 'question' | 'command' | 'express_emotion' | 'ask_about_ai' | 'chat'
}

export class NLPAnalyzer {
  private hfToken: string

  constructor() {
    this.hfToken = process.env.HUGGINGFACE_TOKEN!
  }

  async detectEmotion(text: string): Promise<string> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base',
        {
          headers: { Authorization: `Bearer ${this.hfToken}` },
          method: 'POST',
          body: JSON.stringify({ inputs: text }),
        }
      )

      if (!response.ok) throw new Error('HuggingFace API error')

      const data = await response.json()
      
      if (Array.isArray(data)) {
        const emotions = data[0]
        const topEmotion = emotions.reduce((max, emotion) => 
          emotion.score > max.score ? emotion : max
        )
        return topEmotion.label
      }
    } catch (error) {
      // Fallback to basic sentiment analysis
      return this.basicSentimentAnalysis(text)
    }

    return 'neutral'
  }

  private basicSentimentAnalysis(text: string): string {
    const positiveWords = ['happy', 'joy', 'love', 'excited', 'good', 'great', 'wonderful']
    const negativeWords = ['sad', 'angry', 'hurt', 'bad', 'terrible', 'awful', 'hate']

    const textLower = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => textLower.includes(word)).length
    const negativeCount = negativeWords.filter(word => textLower.includes(word)).length

    if (positiveCount > negativeCount) return 'joy'
    if (negativeCount > positiveCount) return 'sadness'
    return 'neutral'
  }

  detectIntent(text: string): NLPAnalysis['intent'] {
    const textLower = text.toLowerCase()

    if (['hi', 'hello', 'hey', 'greetings'].some(word => textLower.includes(word))) {
      return 'greeting'
    } else if (['how are you', 'how do you feel'].some(phrase => textLower.includes(phrase))) {
      return 'ask_about_ai'
    } else if (textLower.includes('?')) {
      return 'question'
    } else if (['sad', 'happy', 'angry', 'excited', 'feel', 'feeling'].some(word => textLower.includes(word))) {
      return 'express_emotion'
    } else if (['set', 'remind', 'timer', 'alarm', 'schedule'].some(word => textLower.includes(word))) {
      return 'command'
    } else {
      return 'chat'
    }
  }

  async analyze(text: string): Promise<NLPAnalysis> {
    const [emotion, intent] = await Promise.all([
      this.detectEmotion(text),
      Promise.resolve(this.detectIntent(text))
    ])

    return { emotion, intent }
  }
}
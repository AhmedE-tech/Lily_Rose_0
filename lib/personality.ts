export class Personality {
  adjust(rawResponse: string): string {
    // Remove robotic prefixes
    const prefixesToRemove = [
      "Sure, ", "Okay, ", "Well, ", "Actually, ", 
      "I think ", "In my opinion ", "As an AI "
    ]
    
    let response = rawResponse
    for (const prefix of prefixesToRemove) {
      if (response.startsWith(prefix)) {
        response = response.slice(prefix.length).trim()
      }
    }
    
    // Add Lily's signature touches occasionally (20% chance)
    const lilyTouches = [
      "*chuckles* ",
      "*thoughtful* ",
      "*warmly* ",
      "*playfully* ",
      "*softly* ",
      "*gently* "
    ]
    
    if (Math.random() < 0.2) {
      const touch = lilyTouches[Math.floor(Math.random() * lilyTouches.length)]
      response = `${touch}${response}`
    }
    
    // Ensure proper punctuation
    if (!response.endsWith('.') && !response.endsWith('!') && !response.endsWith('?')) {
      response += '.'
    }
    
    return response
  }
}
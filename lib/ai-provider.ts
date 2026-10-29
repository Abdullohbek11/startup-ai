/**
 * AI API provayderi: avval OpenAI (eng ishonchli), keyin Groq.
 * .env da OPENAI_API_KEY yoki GROQ_API_KEY beriladi.
 */
export type AIProvider = 'openai' | 'groq'

export function getAIProvider(): {
  provider: AIProvider
  apiKey: string
  baseUrl: string
  chatModel: string
  maxTokensDefault: number
} | null {
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  if (openaiKey) {
    return {
      provider: 'openai',
      apiKey: openaiKey,
      baseUrl: 'https://api.openai.com/v1',
      chatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
      maxTokensDefault: 1400,
    }
  }
  const groqKey = process.env.GROQ_API_KEY?.trim()
  if (groqKey) {
    return {
      provider: 'groq',
      apiKey: groqKey,
      baseUrl: 'https://api.groq.com/openai/v1',
      chatModel: 'llama-3.3-70b-versatile',
      maxTokensDefault: 1400,
    }
  }
  return null
}

export function getAIProviderError(): string {
  return "AI kaliti sozlanmagan. .env da OPENAI_API_KEY yoki GROQ_API_KEY kiriting. OpenAI eng ishonchli (platform.openai.com)."
}

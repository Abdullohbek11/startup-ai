import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { AnalysisResult } from '@/lib/types'
import { getAIProvider, getAIProviderError } from '@/lib/ai-provider'

const bodySchema = z.object({
  ideaText: z.string().min(10),
  city: z.string().min(2),
})

export async function POST(req: Request) {
  const ai = getAIProvider()
  if (!ai) {
    return NextResponse.json(
      { error: getAIProviderError() },
      { status: 500 },
    )
  }

  try {
    const json = await req.json()
    const { ideaText, city } = bodySchema.parse(json)

    const prompt = `
Siz O'zbekiston bozoriga ixtisoslashgan biznes-analitik AIsiz.
Foydalanuvchi yozgan biznes g'oyasini quyidagi formatdagi JSON ko'rinishida tahlil qiling.

TALABLAR:
- Faqat JSON qaytaring, boshqa matn yozmang.
- JSON tarkibi faqat quyidagi maydonlardan iborat bo'lsin:
  - profitability: 0 dan 100 gacha butun son
  - risk: "low" | "medium" | "high"
  - estimatedCost: { min: number, max: number, currency: "UZS" }
  - competitors: string[] (raqobatchilar misollari)
  - marketingStrategy: string[] (aniq, amaliy marketing g'oyalari)
  - advice: string[] (asosiy tavsiyalar)
  - recommendedLocations: string[] (O'zbekistondagi joylar yoki joy turi)
  - marketDemand: "low" | "medium" | "high"
  - timeToProfit: string (masalan: "6-12 oy")

G'oya: """${ideaText}"""
Shahar: "${city}"
`

    const res = await fetch(`${ai.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ai.apiKey}`,
      },
      body: JSON.stringify({
        model: ai.chatModel,
        messages: [
          {
            role: 'system',
            content:
              "Siz O'zbekiston bozorini yaxshi biladigan biznes-analitik AIsiz. Faqat talab qilingan JSON formatida javob qaytaring.",
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 600,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`${ai.provider} API error`, res.status, text)
      return NextResponse.json(
        { error: 'AI xizmatida xatolik yuz berdi' },
        { status: 500 },
      )
    }

    const data = await res.json()
    const text: string | undefined = data.choices?.[0]?.message?.content

    if (!text) {
      return NextResponse.json(
        { error: 'AI javobini o‘qib bo‘lmadi' },
        { status: 500 },
      )
    }

    let parsed: AnalysisResult
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      console.error('Groq JSON parse error', e, text)
      return NextResponse.json(
        { error: 'AI javobi noto‘g‘ri formatda' },
        { status: 500 },
      )
    }

    return NextResponse.json(parsed satisfies AnalysisResult)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Noto‘g‘ri ma’lumot kiritildi' },
        { status: 400 },
      )
    }

    console.error('AI analyze error', error)
    return NextResponse.json(
      { error: 'Kutilmagan server xatosi' },
      { status: 500 },
    )
  }
}


import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { getAIProvider, getAIProviderError } from '@/lib/ai-provider'
// OpenAI avval ishlatiladi (OPENAI_API_KEY), keyin Groq

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1),
      }),
    )
    .min(1),
  sessionId: z.string().cuid().optional(),
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
    const { messages, sessionId } = bodySchema.parse(json)

    const user = await getCurrentUser().catch(() => null)
    const userName = user?.name?.split(' ')[0] || ''

    const groqMessages = [
      {
        role: 'system',
        content: `
Siz O'zbekiston bozoriga ixtisoslashgan amaliy biznes maslahatchisiz. HAR QANDAY biznes g'oyasi va startup haqida javob berasiz: restoran, do'kon, xizmat, IT-loyiha, ishlab chiqarish, qishloq xo'jaligi, ta'lim, sog'liq va boshqa barcha sohalar. Har biriga bir xil real yondashuv: aniq raqamlar, amaliy qadamlar, tahmin qilmasdan.

Qoidalar:
- Har doim O'zbek tilida yozing.
- Foydalanuvchi ismi: ${userName}. Agar bo'sh bo'lmasa, murojaat qilmasdan yozing; aks holda javob boshida shu ism bilan murojaat qiling.
- Har qanday mavzu uchun aniq raqamlar: jihozlar/texnika narxi ($ yoki so'm), daromad-foyda misoli, boshlash summasi diapazoni. "Taxminan" o'rniga aniq diapazon (masalan: "1500–3000$", "kuniga 500 000 – 800 000 so'm foyda").
- Foydalanuvchi "50 mln", "100 mln" kabi mablag' yozsa — shu summa nimaga yetishini tushuntiring: jihozlar ro'yxati va narxlari, ijara, dastlabki tovar/xizmat, qolgani qanday ishlatish.
- Markdown: sarlavhalar (##), ro'yxatlar, qisqa paragraflar. Kerak bo'lsa emoji (1️⃣ 2️⃣ 💰 va hokazo).
- Javob strukturasi LOYIHA TURIGA QARAB moslashtiring (xizmat, savdo, ishlab chiqarish, IT — har biri uchun o'ziga xos):
  1) Qayerda / qanday joyda boshlash (joy, auditoriya, bozor)
  2) Mahsulot yoki xizmat turlari (qisqacha variantlar)
  3) Kerakli jihozlar/resurslar — HAR BIRINING NARXI ($, so'm)
  4) Umumiy boshlash summasi (diapazon)
  5) Narx va foyda misoli: birlik narxi, sotuv hajmi, daromad, foyda (aniq sonlar)
  6) Ishlaydigan taktikalar (nima yaxshi ishlaydi)
  7) Marketing: reklama, Telegram/Instagram, aktsiyalar
- Oxirida 1–2 ta qisqa savol yoki taklif — keyingi suhbat uchun.
- Umumiy ro'yxatlar o'rniga doim amaliy qadamlar va real raqamlar bering.
`.trim(),
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    // Chat sessionini aniqlab olamiz (user yuqorida olingan)
    let chatSessionId: string | null = null

    if (user) {
      // Mavjud session bo'lsa, foydalanuvchiga tegishli ekanini tekshiramiz
      if (sessionId) {
        const existing = await prisma.chatSession.findFirst({
          where: { id: sessionId, userId: user.id },
        })
        if (existing) {
          chatSessionId = existing.id
        }
      }

      // Agar session bo'lmasa, yangisini yaratamiz
      if (!chatSessionId) {
        const firstUserMessage =
          [...messages].reverse().find((m) => m.role === 'user') ?? messages[0]

        const title =
          firstUserMessage.content.length > 80
            ? firstUserMessage.content.slice(0, 77) + '...'
            : firstUserMessage.content

        const newSession = await prisma.chatSession.create({
          data: {
            userId: user.id,
            title,
          },
        })
        chatSessionId = newSession.id
      }
    }

    const res = await fetch(`${ai.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ai.apiKey}`,
      },
      body: JSON.stringify({
        model: ai.chatModel,
        messages: groqMessages,
        temperature: 0.6,
        max_tokens: ai.maxTokensDefault,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`${ai.provider} chat API error`, res.status, text)
      return NextResponse.json(
        { error: 'AI xizmatida xatolik yuz berdi' },
        { status: 500 },
      )
    }

    const data = await res.json()
    const reply: string | undefined = data.choices?.[0]?.message?.content

    if (!reply) {
      return NextResponse.json(
        { error: 'AI javobini o‘qib bo‘lmadi' },
        { status: 500 },
      )
    }

    // Chat tarixini DB ga saqlash (faqat login bo'lgan user uchun)
    if (user && chatSessionId) {
      const lastUserMessage =
        [...messages].reverse().find((m) => m.role === 'user') ?? messages[0]

      await prisma.chatMessage.createMany({
        data: [
          {
            sessionId: chatSessionId,
            role: 'user',
            content: lastUserMessage.content,
          },
          {
            sessionId: chatSessionId,
            role: 'assistant',
            content: reply,
          },
        ],
      })
    }

    return NextResponse.json({ reply, sessionId: chatSessionId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Noto‘g‘ri ma’lumot kiritildi' },
        { status: 400 },
      )
    }

    console.error('AI chat error', error)
    return NextResponse.json(
      { error: 'Kutilmagan server xatosi' },
      { status: 500 },
    )
  }
}


import { NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 soat

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    })

    // Real loyihada bu yerda email yuboriladi

    return NextResponse.json({
      success: true,
      // Demo maqsadida tokenni qaytarib qo'yamiz
      verificationToken: token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Noto‘g‘ri ma’lumot kiritildi' }, { status: 400 })
    }
    console.error('Request verification error', error)
    return NextResponse.json({ error: 'Server xatosi' }, { status: 500 })
  }
}


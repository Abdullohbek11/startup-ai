import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, signAuthToken, setAuthCookie } from '@/lib/auth'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  city: z.string().min(2),
  role: z.enum(['user', 'admin', 'advertiser']).optional(),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const parsed = registerSchema.parse(data)

    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Bu email bilan foydalanuvchi allaqachon mavjud' },
        { status: 400 },
      )
    }

    const passwordHash = await hashPassword(parsed.password)

    const user = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        passwordHash,
        city: parsed.city,
        role: parsed.role ?? 'user',
      },
    })

    if (user.role === 'advertiser') {
      await prisma.advertiserProfile.create({
        data: {
          userId: user.id,
          companyName: user.name,
          description: '',
          phone: '',
          website: null,
          city: user.city,
        },
      })
    }

    const token = signAuthToken({ userId: user.id, role: user.role })
    await setAuthCookie(token)

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          city: user.city,
          createdAt: user.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Noto‘g‘ri ma’lumot kiritildi' }, { status: 400 })
    }
    console.error('Register error', error)
    return NextResponse.json({ error: 'Server xatosi' }, { status: 500 })
  }
}


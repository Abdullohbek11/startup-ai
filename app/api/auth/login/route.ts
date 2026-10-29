import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyPassword, signAuthToken, setAuthCookie } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const parsed = loginSchema.parse(data)

    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'Email yoki parol noto‘g‘ri' }, { status: 401 })
    }

    if (user.isBlocked) {
      return NextResponse.json({ error: 'Hisob bloklangan' }, { status: 403 })
    }

    const valid = await verifyPassword(parsed.password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Email yoki parol noto‘g‘ri' }, { status: 401 })
    }

    const token = signAuthToken({ userId: user.id, role: user.role })
    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        city: user.city,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Noto‘g‘ri ma’lumot kiritildi' }, { status: 400 })
    }
    console.error('Login error', error)
    return NextResponse.json({ error: 'Server xatosi' }, { status: 500 })
  }
}


// SQLite bazadagi barcha jadvallarni data.json faylga eksport qiladi.
// Ishlatish: node scripts/export-data.mjs
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'node:fs'

const prisma = new PrismaClient()

const data = {
  exportedAt: new Date().toISOString(),
  users: await prisma.user.findMany(),
  startupIdeas: await prisma.startupIdea.findMany(),
  advertiserProfiles: await prisma.advertiserProfile.findMany(),
  advertisements: await prisma.advertisement.findMany(),
  emailVerificationTokens: await prisma.emailVerificationToken.findMany(),
  passwordResetTokens: await prisma.passwordResetToken.findMany(),
  chatSessions: await prisma.chatSession.findMany({ include: { messages: true } }),
}

writeFileSync('data.json', JSON.stringify(data, null, 2))
await prisma.$disconnect()
console.log('data.json yozildi:', Object.fromEntries(Object.entries(data).filter(([, v]) => Array.isArray(v)).map(([k, v]) => [k, v.length])))

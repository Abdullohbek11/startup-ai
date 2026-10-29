'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Email yoki parol noto\'g\'ri')
      }
    } catch {
      setError('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
              <span className="text-sm font-bold">SV</span>
            </div>
            <span className="font-semibold">Startup Validator</span>
          </Link>
          
          <div>
            <blockquote className="text-lg text-primary-foreground/90">
              "Bu platforma menga biznesimni boshlashdan oldin barcha risklar haqida ma'lumot berdi. 
              Endi men aniq rejaga ega bo'lib ishni boshladim."
            </blockquote>
            <p className="mt-4 text-primary-foreground/70">
              - Sardor Rahimov, Restoran egasi
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col lg:w-1/2">
        <div className="p-6 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifa
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight">Xush kelibsiz!</h1>
              <p className="mt-2 text-muted-foreground">
                Hisobingizga kirish uchun ma'lumotlarni kiriting
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Parol</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Parolni unutdingizmi?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kirish...
                  </>
                ) : (
                  'Kirish'
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Hisobingiz yo'qmi?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Ro'yxatdan o'tish
              </Link>
            </p>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo hisoblar</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                <p><strong>User:</strong> aziz@example.com</p>
                <p><strong>Admin:</strong> admin@validator.uz</p>
                <p><strong>Advertiser:</strong> info@techsolutions.uz</p>
                <p className="text-[10px]">Har qanday parol bilan kirish mumkin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

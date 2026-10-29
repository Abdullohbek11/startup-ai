'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { startupIdeas } from '@/lib/startup-ideas'
import { ShoppingBag, MapPin, Rocket, ArrowRight } from 'lucide-react'

export default function RecommendationsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Sizga tavsiya etiladigan loyihalar — Real loyihalar dan bir nechta
  const recommended = startupIdeas.slice(0, 6)

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Tavsiyalar</h1>
          <p className="mt-1 text-muted-foreground">
            Sizning profil va qiziqishlaringizga mos startup va biznes g&apos;oyalari
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 perspective-800">
          {recommended.map((idea, i) => (
            <Card key={idea.id} className="flex flex-col opacity-0 animate-tilt-3d-in transition-shadow hover-tilt-3d hover:shadow-md" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}>
              <CardContent className="flex flex-1 flex-col p-5">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${idea.color} text-white`}>
                  <span className="text-sm font-bold">{idea.title.slice(0, 1)}</span>
                </div>
                <h3 className="font-semibold">{idea.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{idea.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {idea.city}
                  <Badge variant="secondary" className="text-xs">
                    {idea.sector}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href={`/validator?idea=${encodeURIComponent(idea.title + ': ' + idea.tagline)}`}>
                    <Rocket className="mr-2 h-4 w-4" />
                    AI da tekshirish
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/marketplace">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Barcha Real loyihalar
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

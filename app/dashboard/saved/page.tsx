'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Bookmark, Plus, ExternalLink } from 'lucide-react'

export default function SavedPage() {
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

  // Hozircha saqlanganlar ro'yxati bo'sh — keyin API dan olinadi
  const savedItems: { id: string; title: string; type: 'idea' | 'startup'; link: string }[] = []

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Saqlangan</h1>
          <p className="mt-1 text-muted-foreground">
            Saqlab qo&apos;ygan g&apos;oyalar va loyihalaringiz
          </p>
        </div>

        {savedItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Hali saqlanganlar yo&apos;q</h3>
              <p className="mt-2 max-w-sm text-center text-muted-foreground">
                Marketplace va Validator da yoqqan g&apos;oyalarni saqlab qo&apos;ying — ular shu yerda ko&apos;rinadi
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/marketplace">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Real loyihalar
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/validator">
                    <Plus className="mr-2 h-4 w-4" />
                    G&apos;oya tekshirish
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item) => (
              <Card key={item.id} className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.link}>Ko&apos;rish</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

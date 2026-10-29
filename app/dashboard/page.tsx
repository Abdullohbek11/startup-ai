'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { mockIdeas, mockAdvertisements } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/ai-analysis'
import {
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Plus,
  Eye,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
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

  const userIdeas = mockIdeas.filter(idea => idea.userId === '1')
  const recentAds = mockAdvertisements.slice(0, 3)

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Xush kelibsiz, {user.name}!</h1>
          <p className="mt-1 text-muted-foreground">
            Biznes g'oyalaringizni tekshiring va bozorni o'rganing
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Yangi g'oya tekshirish</h3>
              <p className="mt-1 text-sm text-muted-foreground">AI yordamida tahlil qiling</p>
              <Button className="mt-4" asChild>
                <Link href="/validator">Boshlash</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">{userIdeas.length}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Jami g'oyalar</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold">
                  {userIdeas.filter(i => i.score >= 70).length}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Yuqori baholi</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">{mockAdvertisements.length}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Mavjud xizmatlar</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Ideas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">So'nggi g'oyalar</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/ideas">
                  Barchasi
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {userIdeas.length === 0 ? (
                <div className="py-8 text-center">
                  <Lightbulb className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Hali g'oyalar yo'q</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/validator">Birinchi g'oyani tekshiring</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userIdeas.slice(0, 3).map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-start justify-between rounded-lg border p-4"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{idea.ideaText}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{idea.city}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(idea.createdAt).toLocaleDateString('uz-UZ')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                          idea.score >= 70 
                            ? 'bg-green-100 text-green-700' 
                            : idea.score >= 50 
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {idea.score}/100
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Services */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tavsiya etilgan xizmatlar</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/marketplace">
                  Marketplace
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{ad.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {ad.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{ad.advertiser?.companyName}</span>
                        {ad.price > 0 && (
                          <span className="font-medium">{formatCurrency(ad.price)} so'm</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdvertiserLayout } from '@/components/advertiser/advertiser-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { mockAdvertisements } from '@/lib/mock-data'
import {
  Megaphone,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function AdvertiserDashboardPage() {
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

  const myAds = mockAdvertisements.slice(0, 4)
  const totalViews = myAds.reduce((acc, ad) => acc + ad.views, 0)
  const approvedAds = myAds.filter(ad => ad.status === 'approved').length
  const pendingAds = myAds.filter(ad => ad.status === 'pending').length

  return (
    <AdvertiserLayout>
      <div className="p-6 lg:p-8">
        {/* Welcome section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reklama beruvchi paneli</h1>
            <p className="mt-1 text-muted-foreground">
              Reklamalaringizni boshqaring va statistikani kuzating
            </p>
          </div>
          <Button asChild>
            <Link href="/advertiser/new">
              <Plus className="mr-2 h-4 w-4" />
              Yangi reklama
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">{myAds.length}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Jami reklamalar</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">{totalViews.toLocaleString()}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Jami ko'rishlar</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold">{approvedAds}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Tasdiqlangan</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">{pendingAds}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Kutilmoqda</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Ads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">So'nggi reklamalar</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/advertiser/ads">
                Barchasi
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {myAds.length === 0 ? (
              <div className="py-8 text-center">
                <Megaphone className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">Hali reklamalar yo'q</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/advertiser/new">Birinchi reklamani qo'shing</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="flex items-start justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{ad.title}</h3>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          ad.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : ad.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {ad.status === 'approved' ? 'Tasdiqlangan' : 
                           ad.status === 'pending' ? 'Kutilmoqda' : 'Rad etilgan'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {ad.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {ad.views} ko'rishlar
                        </span>
                        <span>{ad.city}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <TrendingUp className={`h-4 w-4 ${
                        ad.views > 1000 ? 'text-green-500' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdvertiserLayout>
  )
}

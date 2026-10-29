'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdvertiserLayout } from '@/components/advertiser/advertiser-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { mockAdvertisements } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/types'
import { formatCurrency } from '@/lib/ai-analysis'
import {
  Plus,
  MapPin,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Megaphone
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function AdvertiserAdsPage() {
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

  const myAds = mockAdvertisements

  return (
    <AdvertiserLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reklamalarim</h1>
            <p className="mt-1 text-muted-foreground">
              Barcha reklamalaringizni boshqaring
            </p>
          </div>
          <Button asChild>
            <Link href="/advertiser/new">
              <Plus className="mr-2 h-4 w-4" />
              Yangi reklama
            </Link>
          </Button>
        </div>

        {myAds.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Megaphone className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Hali reklamalar yo'q</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Birinchi reklamangizni qo'shing va mijozlarni jalb qiling
              </p>
              <Button className="mt-6" asChild>
                <Link href="/advertiser/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Reklama qo'shish
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {myAds.map((ad) => (
              <Card key={ad.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-medium">{ad.title}</h3>
                        <Badge className={
                          ad.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : ad.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }>
                          {ad.status === 'approved' ? 'Tasdiqlangan' : 
                           ad.status === 'pending' ? 'Kutilmoqda' : 'Rad etilgan'}
                        </Badge>
                        <Badge variant="secondary">
                          {CATEGORY_LABELS[ad.category]}
                        </Badge>
                      </div>
                      
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {ad.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {ad.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {ad.views} ko'rishlar
                        </span>
                        <span>
                          Joylangan: {new Date(ad.createdAt).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {ad.price > 0 ? formatCurrency(ad.price) + ' so\'m' : 'Bepul'}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Tahrirlash
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            O'chirish
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdvertiserLayout>
  )
}

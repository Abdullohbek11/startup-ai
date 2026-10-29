'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdvertiserLayout } from '@/components/advertiser/advertiser-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/auth-context'
import { CITIES, CATEGORY_LABELS, type AdvertisementCategory } from '@/lib/types'
import { Loader2, CheckCircle } from 'lucide-react'

export default function NewAdPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as AdvertisementCategory | '',
    price: '',
    city: ''
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      router.push('/advertiser/ads')
    }, 2000)
  }

  if (isSuccess) {
    return (
      <AdvertiserLayout>
        <div className="flex min-h-[60vh] items-center justify-center p-6">
          <Card className="max-w-md text-center">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Reklama yuborildi!</h2>
              <p className="mt-2 text-muted-foreground">
                Reklamangiz ko'rib chiqish uchun yuborildi. Tasdiqlanganidan so'ng marketplace da ko'rinadi.
              </p>
            </CardContent>
          </Card>
        </div>
      </AdvertiserLayout>
    )
  }

  const categories = Object.entries(CATEGORY_LABELS) as [AdvertisementCategory, string][]

  return (
    <AdvertiserLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Yangi reklama qo'shish</h1>
          <p className="mt-1 text-muted-foreground">
            Xizmat yoki mahsulotingizni marketplace da joylang
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Reklama ma'lumotlari</CardTitle>
              <CardDescription>
                Barcha maydonlarni to'ldiring. Reklama moderatsiyadan o'tgandan so'ng chop etiladi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Sarlavha</Label>
                  <Input
                    id="title"
                    placeholder="Xizmat yoki mahsulot nomi"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Tavsif</Label>
                  <textarea
                    id="description"
                    placeholder="Xizmat yoki mahsulot haqida batafsil ma'lumot"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[120px] w-full resize-none rounded-md border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoriya</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as AdvertisementCategory })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Kategoriyani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Shahar</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Shaharni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Narx (so'm)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0 - bepul konsultatsiya"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    0 qoldiring agar bepul konsultatsiya taklif qilsangiz
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="font-medium">Reklama narxi</h4>
                  <p className="mt-1 text-2xl font-bold">500,000 so'm</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    30 kunlik joylash. Reklamangiz marketplace da ko'rinadi.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    'Reklamani yuborish'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdvertiserLayout>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { mockIdeas } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/ai-analysis'
import {
  Plus,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  ChevronRight
} from 'lucide-react'

export default function IdeasPage() {
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

  const userIdeas = mockIdeas

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mening g'oyalarim</h1>
            <p className="mt-1 text-muted-foreground">
              Barcha tekshirilgan biznes g'oyalaringiz
            </p>
          </div>
          <Button asChild>
            <Link href="/validator">
              <Plus className="mr-2 h-4 w-4" />
              Yangi g'oya
            </Link>
          </Button>
        </div>

        {userIdeas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Hali g'oyalar yo'q</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Birinchi biznes g'oyangizni tekshiring va AI tahlilini oling
              </p>
              <Button className="mt-6" asChild>
                <Link href="/validator">
                  <Plus className="mr-2 h-4 w-4" />
                  G'oya tekshirish
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userIdeas.map((idea) => (
              <Card key={idea.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{idea.ideaText}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {idea.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(idea.createdAt).toLocaleDateString('uz-UZ')}
                        </span>
                        <Badge variant="secondary">{idea.businessType}</Badge>
                      </div>

                      {idea.analysisResult && (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">Foydalilik</p>
                            <p className="text-lg font-semibold">{idea.analysisResult.profitability}/100</p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">Risk darajasi</p>
                            <div className="flex items-center gap-1">
                              <AlertTriangle className={`h-4 w-4 ${
                                idea.analysisResult.risk === 'low' 
                                  ? 'text-green-500' 
                                  : idea.analysisResult.risk === 'medium'
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                              }`} />
                              <span className="font-medium capitalize">
                                {idea.analysisResult.risk === 'low' ? 'Past' : 
                                 idea.analysisResult.risk === 'medium' ? 'O\'rtacha' : 'Yuqori'}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">Boshlang'ich kapital</p>
                            <p className="font-semibold">
                              {formatCurrency(idea.analysisResult.estimatedCost.min)} so'm
                            </p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">Foydaga chiqish</p>
                            <p className="font-semibold">{idea.analysisResult.timeToProfit}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${
                        idea.score >= 70 
                          ? 'bg-green-100 text-green-700' 
                          : idea.score >= 50 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {idea.score}
                      </div>
                      <Button variant="ghost" size="sm">
                        Batafsil
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

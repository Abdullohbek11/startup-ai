'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { AnalysisResult, Advertisement, AdvertisementCategory } from '@/lib/types'
import { formatCurrency } from '@/lib/ai-analysis'
import { mockAdvertisements } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/types'
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  Megaphone,
  Lightbulb,
  MapPin,
  Clock,
  BarChart3,
  Building2,
  MapPin as MapPinIcon,
} from 'lucide-react'

interface AnalysisResultsProps {
  result: AnalysisResult | null
  ideaText: string
  city: string
  isLoading: boolean
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference
  
  let color = 'text-destructive'
  if (score >= 70) color = 'text-green-500'
  else if (score >= 50) color = 'text-yellow-500'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-32 w-32 -rotate-90 transform">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-muted"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl font-bold ${color}`}>{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function getRecommendedAds(ideaText: string, city: string): Advertisement[] {
  const lower = ideaText.toLowerCase()

  const wantedCategories = new Set<AdvertisementCategory>()

  // Food / restaurant
  if (lower.includes('restoran') || lower.includes('fast food') || lower.includes('kafe') || lower.includes('oshxona')) {
    ;['suppliers', 'equipment', 'logistics', 'marketing', 'franchise'].forEach((c) =>
      wantedCategories.add(c as AdvertisementCategory),
    )
  }

  // Clothing / shop
  if (lower.includes('kiyim') || lower.includes("do'kon") || lower.includes('butik')) {
    ;['suppliers', 'equipment', 'marketing', 'logistics'].forEach((c) =>
      wantedCategories.add(c as AdvertisementCategory),
    )
  }

  // IT / startup
  if (lower.includes('it') || lower.includes('dastur') || lower.includes('app') || lower.includes('startup')) {
    ;['marketing', 'consulting', 'finance', 'legal'].forEach((c) =>
      wantedCategories.add(c as AdvertisementCategory),
    )
  }

  // Education
  if (lower.includes("ta'lim") || lower.includes("o'quv") || lower.includes('kurs') || lower.includes('markaz')) {
    ;['marketing', 'consulting', 'finance'].forEach((c) =>
      wantedCategories.add(c as AdvertisementCategory),
    )
  }

  // Beauty / salon
  if (lower.includes("go'zallik") || lower.includes('salon') || lower.includes('sartarosh')) {
    ;['equipment', 'suppliers', 'marketing'].forEach((c) =>
      wantedCategories.add(c as AdvertisementCategory),
    )
  }

  // Agar hech qanday kategoriya aniqlanmasa – reklamani umuman ko‘rsatmaymiz
  if (wantedCategories.size === 0) {
    return []
  }

  const categoriesArray = Array.from(wantedCategories)

  return mockAdvertisements
    .filter((ad) => {
      if (ad.status !== 'approved') return false

      const matchesCategory = categoriesArray.includes(ad.category)
      const matchesCity = ad.city === city || ad.city === 'Toshkent'

      return matchesCategory && matchesCity
    })
    .slice(0, 4)
}

export function AnalysisResults({ result, ideaText, city, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">AI sizning g'oyangizni tahlil qilmoqda...</p>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  if (!result) return null

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const variants = {
      low: { label: 'Past', className: 'bg-green-100 text-green-800' },
      medium: { label: 'O\'rtacha', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Yuqori', className: 'bg-red-100 text-red-800' }
    }
    return variants[risk]
  }

  const getDemandBadge = (demand: 'low' | 'medium' | 'high') => {
    const variants = {
      low: { label: 'Past', className: 'bg-red-100 text-red-800' },
      medium: { label: 'O\'rtacha', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Yuqori', className: 'bg-green-100 text-green-800' }
    }
    return variants[demand]
  }

  const riskInfo = getRiskBadge(result.risk)
  const demandInfo = getDemandBadge(result.marketDemand)
  const recommendedAds = getRecommendedAds(ideaText, city)

  return (
    <div className="space-y-8">
      {/* Header with Score */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-6 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Sizning g'oyangiz</p>
              <h2 className="mt-1 text-xl font-semibold">{ideaText}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                <MapPin className="mr-1 inline h-4 w-4" />
                {city}
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Foydalilik bahosi</p>
              <ScoreCircle score={result.profitability} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk darajasi</p>
              <Badge className={riskInfo.className}>{riskInfo.label}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Boshlang'ich kapital</p>
              <p className="font-semibold">
                {formatCurrency(result.estimatedCost.min)} - {formatCurrency(result.estimatedCost.max)} so'm
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bozor talabi</p>
              <Badge className={demandInfo.className}>{demandInfo.label}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Foydaga chiqish</p>
              <p className="font-semibold">{result.timeToProfit}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Raqobatchilar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.competitors.map((competitor, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {competitor}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Megaphone className="h-5 w-5 text-primary" />
              Marketing strategiya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.marketingStrategy.map((strategy, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {strategy}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
              Tavsiyalar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.advice.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Tavsiya etiladigan joylar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendedLocations.map((location, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {location}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Marketplace Recommendations – faqat real hamkorlar bo'lsa ko'rsatamiz */}
      {recommendedAds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-1 text-lg sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Sizga yordam berishi mumkin bo'lgan hamkorlar
              </span>
              <span className="text-xs text-muted-foreground">
                Bu ro'yxat faqat platformaga ro'yxatdan o'tgan real xizmat ko'rsatuvchilardan tuzilgan
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {recommendedAds.map((ad) => (
              <div
                key={ad.id}
                className="flex flex-col justify-between rounded-lg border bg-card p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {ad.advertiser?.companyName ?? "Xizmat ko'rsatuvchi"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {CATEGORY_LABELS[ad.category]} xizmati
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Reklama
                    </Badge>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {ad.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {ad.city}
                  </span>
                  {ad.price > 0 ? (
                    <span className="font-medium">
                      {(ad.price / 1_000_000).toFixed(1)} mln so'm+
                    </span>
                  ) : (
                    <span>Bepul konsultatsiya</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}


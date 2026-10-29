'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CITIES, CATEGORY_LABELS, type AdvertisementCategory } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Package,
  Wrench,
  Megaphone,
  Building2,
  Truck,
  Users,
  Landmark,
  Scale
} from 'lucide-react'

interface MarketplaceFiltersProps {
  selectedCategory: AdvertisementCategory | 'all'
  onCategoryChange: (category: AdvertisementCategory | 'all') => void
  selectedCity: string
  onCityChange: (city: string) => void
}

const categoryIcons: Record<AdvertisementCategory, React.ElementType> = {
  suppliers: Package,
  equipment: Wrench,
  marketing: Megaphone,
  franchise: Building2,
  logistics: Truck,
  consulting: Users,
  finance: Landmark,
  legal: Scale
}

export function MarketplaceFilters({
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange
}: MarketplaceFiltersProps) {
  const categories = Object.entries(CATEGORY_LABELS) as [AdvertisementCategory, string][]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Kategoriyalar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            Barchasi
          </button>
          {categories.map(([key, label]) => {
            const Icon = categoryIcons[key]
            return (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Joylashuv</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="city" className="sr-only">Shahar</Label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Barcha shaharlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha shaharlar</SelectItem>
              {CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

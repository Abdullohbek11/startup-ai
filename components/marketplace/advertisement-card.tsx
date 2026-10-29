import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Advertisement } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/types'
import { formatCurrency } from '@/lib/ai-analysis'
import { MapPin, Eye, ExternalLink, Phone } from 'lucide-react'

interface AdvertisementCardProps {
  advertisement: Advertisement
}

export function AdvertisementCard({ advertisement }: AdvertisementCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardContent className="flex-1 p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Badge variant="secondary" className="shrink-0">
            {CATEGORY_LABELS[advertisement.category]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {advertisement.views}
          </span>
        </div>

        <h3 className="font-semibold leading-tight">{advertisement.title}</h3>
        
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {advertisement.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{advertisement.city}</span>
        </div>

        {advertisement.advertiser && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xs font-medium text-primary">
                {advertisement.advertiser.companyName.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium">{advertisement.advertiser.companyName}</span>
          </div>
        )}

        {advertisement.price > 0 && (
          <div className="mt-4">
            <span className="text-lg font-bold">
              {formatCurrency(advertisement.price)} so'm
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2 border-t p-4">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5">
          <Phone className="h-4 w-4" />
          Aloqa
        </Button>
        {advertisement.advertiser?.website && (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ExternalLink className="h-4 w-4" />
            Sayt
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

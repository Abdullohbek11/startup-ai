'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CITIES } from '@/lib/types'
import { Loader2, Sparkles } from 'lucide-react'

interface IdeaFormProps {
  initialIdea?: string
  onAnalyze: (idea: string, city: string) => Promise<void>
  isAnalyzing: boolean
  error?: string
}

const exampleIdeas = [
  'Toshkentda fast food restoran ochmoqchiman',
  'Samarqandda turistlar uchun mehmonxona',
  'Online til o\'rgatish platformasi',
  'Yetkazib berish xizmati (delivery)',
  'IT outsourcing kompaniya',
]

export function IdeaForm({ initialIdea = '', onAnalyze, isAnalyzing, error }: IdeaFormProps) {
  const [idea, setIdea] = useState(initialIdea)
  const [city, setCity] = useState('Toshkent')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze(idea, city)
  }

  const handleExampleClick = (exampleIdea: string) => {
    setIdea(exampleIdea)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idea">Biznes g'oyangiz</Label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Masalan: Andijonda kiyim do'koni ochmoqchiman..."
              className="min-h-[120px] w-full resize-none rounded-xl border bg-background p-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isAnalyzing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Shahar/Hudud</Label>
            <Select value={city} onValueChange={setCity} disabled={isAnalyzing}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Shaharni tanlang" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" size="lg" className="w-full gap-2" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI tahlil qilmoqda...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                G'oyani tekshirish
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-center text-sm text-muted-foreground">Yoki misollardan birini tanlang:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {exampleIdeas.map((exampleIdea) => (
            <button
              key={exampleIdea}
              type="button"
              onClick={() => handleExampleClick(exampleIdea)}
              className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              disabled={isAnalyzing}
            >
              {exampleIdea}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

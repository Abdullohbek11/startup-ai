'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { startupIdeas } from '@/lib/startup-ideas'
import { MapPin, Rocket, Lightbulb, ArrowRight } from 'lucide-react'

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Real loyihalar — fon ranglari boshqa sahifalar bilan uyum */}
        <section className="relative overflow-hidden bg-zinc-950 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(120,119,198,0.14),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(34,197,94,0.06),transparent)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/90 animate-bounce-soft">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                <span>AI tahlil qilingan</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl animate-fade-in">
                Real loyihalar
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70 animate-fade-in [animation-delay:0.08s] [animation-fill-mode:both] opacity-0">
                Yangi startup va biznes g&apos;oyalari — hozir ishlayotgan kompaniyalar emas. AI bozor, talab va potentsial bo&apos;yicha tahlil qilib, eng yaxshi 10+ g&apos;oyani tanladi.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-800">
              {startupIdeas.map((idea, i) => (
                <div key={idea.id} className="group opacity-0 animate-tilt-3d-in" style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'forwards' }}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:shadow-xl hover-tilt-3d group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.25)]">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${idea.color} text-white shadow-lg transition-transform duration-200 group-hover:scale-105`}>
                      <span className="text-lg font-bold">{idea.title.slice(0, 1)}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{idea.title}</h3>
                    <p className="mb-2 text-sm font-medium text-white/80">{idea.tagline}</p>
                    <p className="mb-4 line-clamp-2 text-sm text-white/60">{idea.description}</p>
                    <p className="mb-2 text-xs font-medium text-emerald-400/90">Nima uchun yaxshi:</p>
                    <p className="mb-4 line-clamp-2 text-xs text-white/50">{idea.whyGood}</p>
                    <p className="mb-2 text-xs font-medium text-amber-400/90">Potentsial:</p>
                    <p className="mb-4 line-clamp-1 text-xs text-white/50">{idea.potential}</p>
                    <div className="mb-4 flex items-center justify-between text-xs text-white/50">
                      <span>{idea.sector}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {idea.city}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      asChild
                    >
                      <Link href={`/validator?idea=${encodeURIComponent(idea.title + ': ' + idea.tagline)}`}>
                        <Rocket className="h-4 w-4" />
                        G&apos;oyani AI da tekshirish
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

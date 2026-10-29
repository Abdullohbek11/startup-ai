'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const router = useRouter()
  const [idea, setIdea] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idea.trim()) {
      router.push(`/validator?idea=${encodeURIComponent(idea)}`)
    }
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col justify-center">
      {/* Animated blobs — blob morph + float */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-primary/25 blur-[100px] animate-blob" aria-hidden />
      <div className="pointer-events-none absolute bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-[80px] animate-glow-breathe [animation-delay:1s]" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/15 blur-[70px] animate-float-up-down [animation-delay:2s]" aria-hidden />
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[80px] animate-float [animation-delay:0.5s]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-sm shadow-4d animate-fade-in-up hover:border-primary/50 transition-colors">
            <Sparkles className="h-4 w-4 text-primary animate-icon-bounce" />
            <span className="text-white/95">AI-powered biznes tahlili</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up [animation-delay:0.05s] [animation-fill-mode:both]">
            Biznes g&apos;oyangizni{' '}
            <span className="text-gradient-primary animate-gradient-text bg-clip-text">
              AI bilan tekshiring
            </span>
          </h1>

          <p className="mt-6 text-pretty text-lg leading-8 text-white/90 sm:text-xl animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:both]">
            O&apos;zbekiston bozorida biznesingiz qanchalik muvaffaqiyatli bo&apos;lishini bilib oling.
            AI tahlil, raqobatchilar, boshlang&apos;ich kapital va marketing strategiyasi.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 animate-scale-in-spring opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
            <div className="group relative mx-auto max-w-2xl perspective-800">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Masalan: Toshkentda fast food restoran ochmoqchiman..."
                className="h-14 w-full rounded-2xl border-2 border-border bg-card/95 pl-5 pr-36 text-base text-foreground shadow-4d ring-0 placeholder:text-white/50 transition-all duration-300 focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.55_0.28_285_/_0.15)] focus:outline-none hover:border-primary/50 sm:h-16 sm:text-lg"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 gap-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
              >
                Tekshirish
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </form>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-white/95">
            {[
              { icon: TrendingUp, text: "12,000+ g'oyalar tahlil qilindi", d: 0.25 },
              { icon: Shield, text: '95% aniqlik darajasi', d: 0.35 },
              { icon: Zap, text: '30 soniyada natija', d: 0.45 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 opacity-0 animate-slide-up-in transition-transform duration-200 hover:scale-105 hover:text-white"
                style={{ animationDelay: `${item.d}s`, animationFillMode: 'forwards' }}
              >
                <item.icon className="h-5 w-5 text-primary animate-pulse-scale" style={{ animationDelay: `${i * 0.2}s` }} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <p className="mt-16 text-xs text-white/85 opacity-0 animate-fade-in [animation-delay:0.8s] [animation-fill-mode:forwards]">
            Pastdagi bo&apos;limlarni ko&apos;ring
          </p>
          <div className="mx-auto mt-2 flex justify-center opacity-0 animate-scroll-hint [animation-delay:0.8s] [animation-fill-mode:forwards]">
            <ChevronDown className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent px-6 py-20 text-center shadow-2xl sm:px-20 sm:py-28 transition-all duration-500 hover:shadow-primary/30 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-30%,rgba(255,255,255,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_80%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute inset-0 animate-glow-breathe bg-white/10" aria-hidden />

          <div className="relative">
            <Sparkles className="mx-auto h-10 w-10 text-white/90 animate-icon-bounce" />
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl opacity-0 animate-fade-in-up [animation-fill-mode:forwards]">
              Biznes g&apos;oyangizni hoziroq tekshiring va muvaffaqiyatga erishish yo&apos;lini toping
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/90 opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
              Minglab tadbirkorlar allaqachon platformamizdan foydalanib, o&apos;z
              bizneslarini muvaffaqiyatli boshladilar.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 animate-scale-in-spring [animation-delay:0.2s] [animation-fill-mode:forwards]">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="gap-2 border-0 bg-white text-primary shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl active:scale-[0.98]"
              >
                <Link href="/validator">
                  Bepul boshlash
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/60 bg-white/5 text-white transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 active:scale-[0.98]"
              >
                <Link href="/marketplace">Marketplace ko&apos;rish</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import {
  Brain,
  BarChart3,
  MapPin,
  Users,
  Lightbulb,
  ShoppingBag,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Tahlil',
    description:
      "Sun'iy intellekt yordamida biznes g'oyangizni chuqur tahlil qiladi va real ma'lumotlarga asoslangan xulosalar beradi.",
  },
  {
    icon: BarChart3,
    title: "Foydalilik Bahosi",
    description:
      "G'oyangizning foydalilik darajasini 0 dan 100 gacha baholab, risk darajasini ko'rsatadi.",
  },
  {
    icon: MapPin,
    title: 'Hudud Tahlili',
    description:
      "O'zbekistonning barcha viloyatlari bo'yicha bozor tahlili va tavsiya etiladigan joylar.",
  },
  {
    icon: Users,
    title: 'Raqobatchilar',
    description:
      'Tanlangan hududdagi mavjud raqobatchilarni aniqlash va ulardan farqlanish yo\'llarini ko\'rsatish.',
  },
  {
    icon: Lightbulb,
    title: 'Marketing Strategiya',
    description:
      'Biznesingiz uchun eng samarali marketing usullari va reklama kanallari bo\'yicha tavsiyalar.',
  },
  {
    icon: ShoppingBag,
    title: 'Xizmatlar Marketplace',
    description:
      'Biznesingizni boshlash uchun kerakli barcha xizmatlar: jihozlar, yetkazib beruvchilar, marketing.',
  },
]

export function FeaturesSection() {
  return (
    <section className="relative border-t border-border/50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-primary opacity-0 animate-fade-in-up [animation-fill-mode:forwards]">
            Imkoniyatlar
          </h2>
          <p
            className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl opacity-0 animate-fade-in-up [animation-delay:0.05s] [animation-fill-mode:forwards]"
          >
            Biznesingizni muvaffaqiyatli boshlash uchun barcha kerakli vositalar
          </p>
          <p
            className="mt-4 text-lg text-muted-foreground opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]"
          >
            Platformamiz sizga to&apos;liq tahlil va kerakli resurslarni taqdim etadi
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 opacity-0 shadow-4d transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 animate-rotate-y-in"
              style={{
                animationDelay: `${0.15 + i * 0.06}s`,
                animationFillMode: 'forwards',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 transition-transform duration-300 group-hover:animate-icon-bounce" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

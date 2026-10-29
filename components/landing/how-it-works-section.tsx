'use client'

const steps = [
  {
    step: '01',
    title: "G'oyangizni yozing",
    description:
      "Biznes g'oyangizni oddiy til bilan yozing. Masalan: \"Samarqandda kafe ochmoqchiman\"",
  },
  {
    step: '02',
    title: 'AI tahlil qiladi',
    description:
      "Sun'iy intellekt g'oyangizni bozor ma'lumotlari, raqobat va iqtisodiy ko'rsatkichlar asosida tahlil qiladi.",
  },
  {
    step: '03',
    title: "Natijalarni oling",
    description:
      "Foydalilik bahosi, risk darajasi, boshlang'ich kapital va batafsil tavsiyalar olasiz.",
  },
  {
    step: '04',
    title: 'Xizmatlarni toping',
    description:
      "Marketplace orqali biznesingizni boshlash uchun kerakli barcha xizmat va mahsulotlarni toping.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative border-t border-border/50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-primary opacity-0 animate-fade-in-up [animation-fill-mode:forwards]">
            Qanday ishlaydi
          </h2>
          <p
            className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl opacity-0 animate-fade-in-up [animation-delay:0.05s] [animation-fill-mode:forwards]"
          >
            4 oddiy qadamda biznesingizni tekshiring
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative opacity-0 animate-slide-up-in"
                style={{
                  animationDelay: `${0.1 + index * 0.12}s`,
                  animationFillMode: 'forwards',
                }}
              >
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-1/2 lg:block"
                    aria-hidden
                  >
                    <div className="h-full w-full bg-gradient-to-r from-primary/60 to-accent/60 opacity-60" />
                  </div>
                )}
                <div className="group relative flex flex-col items-center text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary bg-card text-xl font-bold text-primary shadow-4d transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-primary/20 animate-scale-in-spring"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

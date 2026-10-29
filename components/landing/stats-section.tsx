'use client'

const stats = [
  { value: '12,450+', label: 'Foydalanuvchilar' },
  { value: '8,920', label: "Tahlil qilingan g'oyalar" },
  { value: '13', label: 'Viloyatlar' },
  { value: '95%', label: 'Mamnunlik darajasi' },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.15),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-scale-in-spring"
              style={{
                animationDelay: `${0.1 + i * 0.1}s`,
                animationFillMode: 'forwards',
              }}
            >
              <p className="text-4xl font-extrabold text-white drop-shadow-md sm:text-5xl animate-pulse-scale" style={{ animationDelay: `${i * 0.2}s` }}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

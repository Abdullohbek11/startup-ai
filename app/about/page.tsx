import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Biz haqimizda</h1>
          <p className="mt-4 text-muted-foreground">
            Startup Validator — O&apos;zbekiston tadbirkorlari va startup asoschilari uchun AI asosida biznes g&apos;oyalarini tekshirish platformasi. Biz sizga bozor tahlili, risk bahosi va amaliy tavsiyalar beramiz.
          </p>
          <p className="mt-4 text-muted-foreground">
            Loyiha yil oxirigacha 100+ real startup g&apos;oyasi va xizmatlar bilan kengaytiriladi.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

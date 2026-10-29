import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Foydalanish shartlari</h1>
          <p className="mt-2 text-muted-foreground">Oxirgi yangilanish: {new Date().toLocaleDateString('uz-UZ')}</p>
          <div className="mt-8 space-y-4 text-muted-foreground">
            <p>Platformadan foydalanishingiz bilan siz ushbu shartlarga rozisiz. AI tahlil va tavsiyalar faqat ma&apos;lumot uchun, investitsiya yoki qonuniy maslahat hisoblanmaydi.</p>
            <p>Kontent mualliflik huquqi bilan himoyalangan. Tijoriy maqsadlarda qayta ishlatish taqiqlanadi.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

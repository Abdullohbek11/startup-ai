import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Maxfiylik siyosati</h1>
          <p className="mt-2 text-muted-foreground">Oxirgi yangilanish: {new Date().toLocaleDateString('uz-UZ')}</p>
          <div className="mt-8 space-y-4 text-muted-foreground">
            <p>Startup Validator foydalanuvchi ma&apos;lumotlarini himoya qiladi. Email, ism va boshqa shaxsiy ma&apos;lumotlar faqat xizmat ko&apos;rsatish uchun ishlatiladi va uchinchi tomonlarga berilmaydi.</p>
            <p>Chat va tahlil ma&apos;lumotlari xavfsiz saqlanadi. Cookie va sessiyalar faqat ishlatish qulayligi uchun.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

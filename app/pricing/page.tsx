import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Narxlar</h1>
          <p className="mt-2 text-muted-foreground">
            Hozircha barcha asosiy xizmatlar bepul
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 perspective-800">
            <Card className="opacity-0 animate-tilt-3d-in hover-tilt-3d [animation-delay:0.1s] [animation-fill-mode:forwards]">
              <CardHeader>
                <h2 className="text-xl font-semibold">Bepul</h2>
                <p className="text-3xl font-bold">0 so&apos;m</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> AI g&apos;oya tahlili</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Chat orqali maslahat</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Real loyihalar ro&apos;yxati</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Dashboard</li>
                </ul>
                <Button asChild className="w-full"><Link href="/register">Boshlash</Link></Button>
              </CardContent>
            </Card>
            <Card className="border-primary/30 opacity-0 animate-tilt-3d-in hover-tilt-3d [animation-delay:0.25s] [animation-fill-mode:forwards]">
              <CardHeader>
                <h2 className="text-xl font-semibold">Pro (tez kunda)</h2>
                <p className="text-muted-foreground">Qo&apos;shimcha imkoniyatlar</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Batafsil tahlil, eksport, shaxsiy maslahatchi va boshqa funksiyalar keyingi yangilanishlarda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

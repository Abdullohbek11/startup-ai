import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Tadbirkorlik va startup bo&apos;yicha maqolalar tez kunda
          </p>
          <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Hali maqolalar yo&apos;q</p>
            <Button asChild className="mt-4"><Link href="/">Bosh sahifaga</Link></Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

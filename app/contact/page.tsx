import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-fon-2 bg-fon-pattern py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Aloqa</h1>
          <p className="mt-2 text-muted-foreground">
            Savollar uchun biz bilan bog&apos;laning
          </p>
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@startupvalidator.uz</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Telegram</p>
                  <p className="text-sm text-muted-foreground">@startupvalidator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

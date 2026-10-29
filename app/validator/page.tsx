'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Markdown } from '@/components/ui/markdown'
import { Loader2, Send, User, Bot } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INTRO_MESSAGE: ChatMessage = {
  id: 'intro',
  role: 'assistant',
  content:
    "Salom! Men Startup Idea Validator AI chatman. Biznes g'oyangizni yozing: men uni tahlil qilib, bozor, risk, kapital va marketing bo'yicha tushunarli tavsiyalar beraman.",
}

function ValidatorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const appliedInitialIdea = useRef(false)

  // URL dan kelgan g'oyani chatga yozib, AI javobini so'rash
  useEffect(() => {
    const ideaFromUrl = searchParams.get('idea')
    const trimmed = ideaFromUrl?.trim()
    if (!trimmed || appliedInitialIdea.current) return
    appliedInitialIdea.current = true

    let ideaText: string
    try {
      ideaText = decodeURIComponent(trimmed)
    } catch {
      ideaText = trimmed
    }
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: ideaText,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsSending(true)
    router.replace('/validator', { scroll: false })

    fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [INTRO_MESSAGE, { role: 'user' as const, content: ideaText }],
        sessionId: undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('AI xatosi')
        return res.json() as Promise<{ reply: string; sessionId?: string | null }>
      })
      .then((data) => {
        const aiMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
        }
        setMessages((prev) => [...prev, aiMsg])
        if (data.sessionId) setSessionId(data.sessionId)
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content:
              "Kechirasiz, hozir AI bilan bog'lanishda xatolik yuz berdi. Bir necha soniyadan keyin qayta urinib ko'ring.",
          },
        ])
      })
      .finally(() => setIsSending(false))
  }, [searchParams, router])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isSending])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isSending) return

    const newUserMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, newUserMsg])
    setInput('')
    setIsSending(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newUserMsg].slice(-10),
          sessionId: sessionId ?? undefined,
        }),
      })

      if (!res.ok) {
        throw new Error('AI xatosi')
      }

      const data = (await res.json()) as { reply: string; sessionId?: string | null }

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
      }

      setMessages((prev) => [...prev, aiMsg])
      if (data.sessionId) {
        setSessionId(data.sessionId)
      }
    } catch {
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          "Kechirasiz, hozir AI bilan bog'lanishda xatolik yuz berdi. Bir necha soniyadan keyin qayta urinib ko'ring.",
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="min-h-0 flex-1 overflow-hidden bg-fon-2 bg-fon-pattern">
        <div className="mx-auto flex h-full max-w-5xl flex-col px-4 py-4 sm:px-6 lg:px-8 min-h-0">
          <div className="mb-3 shrink-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl animate-fade-in">
              Biznes g'oyangizni AI bilan suhbatda tekshiring
            </h1>
            <p className="mt-2 text-sm text-muted-foreground animate-fade-in [animation-delay:0.05s] [animation-fill-mode:both] opacity-0">
              G{"'"}oyangizni yozing, savollar bering va Startup Idea Validator AI sizga bozor, risk, kapital va marketing bo{"'"}yicha suhbat tarzida tavsiyalar bersin.
            </p>
          </div>

          <Card className="flex min-h-0 flex-1 flex-col shadow-4d-lg overflow-hidden">
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
            >
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-fade-in [animation-fill-mode:forwards]`}
                    style={{ animationDuration: '0.3s' }}
                  >
                    <div className="flex max-w-[80%] items-start gap-2">
                      {msg.role === 'assistant' && (
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 shadow-sm">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm shadow-4d transition-shadow duration-200 ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-card text-card-foreground border border-primary/10 bg-gradient-to-br from-primary/5 to-background'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <Markdown>{msg.content}</Markdown>
                        ) : (
                          <span className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </span>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-xs text-muted-foreground shadow-sm">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      AI javob yozmoqda...
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t bg-background/80 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Biznes g'oyangiz yoki savolingizni yozing..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  className="min-h-[44px] resize-none"
                />
                <Button
                  className="h-10 w-10 shrink-0 rounded-full"
                  size="icon"
                  onClick={handleSend}
                  disabled={isSending || !input.trim()}
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}


export default function ValidatorPage() {
  return (
    <Suspense>
      <ValidatorContent />
    </Suspense>
  )
}

'use client'

import Link from 'next/link'

const footerLinks = {
  product: [
    { href: '/validator', label: 'Idea Validator' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/pricing', label: 'Narxlar' },
  ],
  company: [
    { href: '/about', label: 'Biz haqimizda' },
    { href: '/contact', label: 'Aloqa' },
    { href: '/blog', label: 'Blog' },
  ],
  legal: [
    { href: '/privacy', label: 'Maxfiylik' },
    { href: '/terms', label: 'Foydalanish shartlari' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card shadow-4d dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="opacity-0 animate-fade-in-up [animation-fill-mode:forwards]">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <span className="text-sm font-bold">SV</span>
              </div>
              <span className="font-semibold text-foreground">Startup Validator</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI yordamida biznes g&apos;oyalaringizni tekshiring va muvaffaqiyatli
              startup boshlang.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up [animation-delay:0.05s] [animation-fill-mode:forwards]">
            <h3 className="font-semibold text-foreground">Mahsulot</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h3 className="font-semibold text-foreground">Kompaniya</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="opacity-0 animate-fade-in-up [animation-delay:0.15s] [animation-fill-mode:forwards]">
            <h3 className="font-semibold text-foreground">Qonuniy</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Startup Validator. Barcha huquqlar
            himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  )
}

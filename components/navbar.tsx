'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
const navLinks = [
  { href: '/validator', label: 'Validator' },
  { href: '/marketplace', label: 'Marketplace' },
]

export function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 shadow-4d transition-all duration-300">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/30">
              <span className="text-sm font-bold">SV</span>
            </div>
            <span className="hidden font-semibold text-foreground sm:block">
              Startup Validator
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground/90 hover:text-primary'
                )}
              >
                {pathname === link.href && (
                  <span className="absolute inset-0 rounded-lg bg-primary/15" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group gap-2 transition-all duration-200 hover:bg-primary/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user.role === 'advertiser' && (
                  <DropdownMenuItem asChild>
                    <Link href="/advertiser" className="cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Reklama Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="transition-colors hover:bg-primary/10 hover:text-primary">
                <Link href="/login">Kirish</Link>
              </Button>
              <Button asChild className="shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-[0.98]">
                <Link href="/register">Ro&apos;yxatdan o&apos;tish</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-primary/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Navigatsiya menyusi"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 animate-fade-in" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden animate-fade-in">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/15 text-primary'
                    : 'text-foreground/90 hover:bg-primary/10 hover:text-primary'
                )}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-3 border-t border-border/50 pt-4">
              {user ? (
                <>
                  <div className="px-4 py-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.role === 'advertiser' && (
                    <Link
                      href="/advertiser"
                      className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Reklama Panel
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    Chiqish
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" asChild className="justify-center">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Kirish
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Ro&apos;yxatdan o&apos;tish
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

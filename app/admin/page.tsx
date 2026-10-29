'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { mockAdvertisements, mockIdeas } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/types'
import {
  Users,
  Megaphone,
  Lightbulb,
  TrendingUp,
  ChevronLeft,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Shield
} from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  if (!mounted || authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const pendingAds = mockAdvertisements.filter(ad => ad.status === 'pending')
  const approvedAds = mockAdvertisements.filter(ad => ad.status === 'approved')
  const totalViews = mockAdvertisements.reduce((sum, ad) => sum + ad.views, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20"><CheckCircle className="mr-1 h-3 w-3" />Tasdiqlangan</Badge>
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20"><Clock className="mr-1 h-3 w-3" />Kutilmoqda</Badge>
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="mr-1 h-3 w-3" />Rad etilgan</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredAds = mockAdvertisements.filter(ad => 
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Foydalanuvchilar</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Megaphone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reklamalar</p>
                <p className="text-2xl font-bold">{mockAdvertisements.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Lightbulb className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">G{"'"}oyalar</p>
                <p className="text-2xl font-bold">{mockIdeas.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jami ko{"'"}rishlar</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Kutilayotgan ({pendingAds.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Megaphone className="h-4 w-4" />
              Barcha reklamalar
            </TabsTrigger>
            <TabsTrigger value="ideas" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              G{"'"}oyalar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Tasdiqlash kutilayotgan reklamalar</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingAds.length === 0 ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                    <h3 className="text-lg font-semibold">Hammasi tasdiqlangan</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Kutilayotgan reklamalar yo{"'"}q
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingAds.map((ad) => (
                      <div key={ad.id} className="flex items-start justify-between rounded-lg border p-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{ad.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{ad.advertiser?.companyName}</span>
                            <span>{ad.city}</span>
                            <span>{CATEGORY_LABELS[ad.category]}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1 text-emerald-600 hover:text-emerald-700">
                            <CheckCircle className="h-4 w-4" />
                            Tasdiqlash
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive">
                            <XCircle className="h-4 w-4" />
                            Rad etish
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Barcha reklamalar</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sarlavha</TableHead>
                        <TableHead>Reklama beruvchi</TableHead>
                        <TableHead>Kategoriya</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ko{"'"}rishlar</TableHead>
                        <TableHead className="text-right">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAds.map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell className="font-medium">{ad.title}</TableCell>
                          <TableCell>{ad.advertiser?.companyName}</TableCell>
                          <TableCell>{CATEGORY_LABELS[ad.category]}</TableCell>
                          <TableCell>{getStatusBadge(ad.status)}</TableCell>
                          <TableCell>{ad.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ko{"'"}rish
                                </DropdownMenuItem>
                                {ad.status === 'pending' && (
                                  <>
                                    <DropdownMenuItem className="text-emerald-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Tasdiqlash
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Rad etish
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  O{"'"}chirish
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ideas">
            <Card>
              <CardHeader>
                <CardTitle>Foydalanuvchi g{"'"}oyalari</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>G{"'"}oya</TableHead>
                        <TableHead>Shahar</TableHead>
                        <TableHead>Baho</TableHead>
                        <TableHead>Sana</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockIdeas.map((idea) => (
                        <TableRow key={idea.id}>
                          <TableCell className="max-w-md truncate font-medium">{idea.ideaText}</TableCell>
                          <TableCell>{idea.city}</TableCell>
                          <TableCell>
                            <Badge className={
                              idea.score >= 70 
                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                : idea.score >= 50 
                                  ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                  : 'bg-red-500/10 text-red-600 border-red-500/20'
                            }>
                              {idea.score}/100
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(idea.createdAt).toLocaleDateString('uz-UZ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

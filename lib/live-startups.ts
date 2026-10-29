/**
 * O'zbekistonda hozirda ishlab turgan va tanilgan startup loyihalar.
 * Marketplace "Haqiqiy startup'lar" bo'limi uchun.
 */
export interface LiveStartup {
  id: string
  name: string
  tagline: string
  description: string
  sector: string
  city: string
  website: string
  founded?: string
  status: 'live' | 'growth' | 'scale'
  badge: string
  color: string // gradient yoki accent
}

export const liveStartups: LiveStartup[] = [
  {
    id: '1',
    name: 'Uzum',
    tagline: 'Super ilova — to\'lovlar, xaridlar, kredit',
    description: 'O\'zbekistondagi eng yirik super ilova. To\'lovlar, e-commerce, logistika va fintech xizmatlari bitta platformada.',
    sector: 'Fintech · E-commerce',
    city: 'Toshkent',
    website: 'https://uzum.uz',
    founded: '2022',
    status: 'scale',
    badge: 'Unicorn',
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: '2',
    name: 'Click',
    tagline: 'Onlayn to\'lovlar va to\'lov tizimlari',
    description: 'Milliy to\'lov tizimi. POS-terminal, onlayn to\'lov, pul o\'tkazmalari va biznes uchun to\'lov qabul qilish.',
    sector: 'Fintech',
    city: 'Toshkent',
    website: 'https://click.uz',
    founded: '2013',
    status: 'scale',
    badge: 'Ishlayapti',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: '3',
    name: 'Payme',
    tagline: 'To\'lovlar va hisob-kitob ilovasi',
    description: 'Mobil to\'lovlar, kommunal to\'lovlar, internet to\'lovlari va savdo nuqtalari uchun to\'lov qabul qilish.',
    sector: 'Fintech',
    city: 'Toshkent',
    website: 'https://payme.uz',
    founded: '2014',
    status: 'live',
    badge: 'Ishlayapti',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: '4',
    name: 'Yandex Go',
    tagline: 'Taksi va yetkazib berish',
    description: 'Toshkent va boshqa shaharlarda taksi chaqirish, oziq-ovqat va buyumlar yetkazib berish xizmati.',
    sector: 'Mobility · Delivery',
    city: 'Toshkent',
    website: 'https://go.yandex',
    status: 'scale',
    badge: 'Xalqaro',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: '5',
    name: 'MyTaxi',
    tagline: 'Taksi va transport xizmati',
    description: 'O\'zbekiston bo\'ylab taksi chaqirish, narxlarni oldindan ko\'rish va xavfsiz sayohat.',
    sector: 'Mobility',
    city: 'Toshkent',
    website: 'https://mytaxi.uz',
    status: 'live',
    badge: 'Ishlayapti',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: '6',
    name: 'ZoodMarket',
    tagline: 'Oziq-ovqat va uy buyumlari yetkazib berish',
    description: 'Oziq-ovqat, uy-ro\'zg\'or buyumlari va supermarket mahsulotlarini uyga yetkazib berish.',
    sector: 'E-commerce · Delivery',
    city: 'Toshkent',
    website: 'https://zoodmarket.com',
    status: 'growth',
    badge: 'O\'smoqda',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: '7',
    name: 'Korzinka.uz',
    tagline: 'Onlayn supermarket',
    description: 'Katta do\'konlar tarmog\'i va onlayn xarid. Mahsulotlar uyga yetkazib beriladi.',
    sector: 'E-commerce · Retail',
    city: 'Toshkent',
    website: 'https://korzinka.uz',
    status: 'scale',
    badge: 'Ishlayapti',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: '8',
    name: 'Soliq.uz',
    tagline: 'Elektron soliq xizmati',
    description: 'Soliq va bojxona to\'lovlari, hisobotlar va biznes uchun elektron davlat xizmatlari.',
    sector: 'GovTech · Fintech',
    city: 'Toshkent',
    website: 'https://my.soliq.uz',
    status: 'live',
    badge: 'Davlat',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: '9',
    name: 'Arzon',
    tagline: 'E-commerce platformasi',
    description: 'Turli tovarlar, elektronika va uy-ro\'zg\'or buyumlari. Milliy marketplace.',
    sector: 'E-commerce',
    city: 'Toshkent',
    website: 'https://arzon.uz',
    status: 'growth',
    badge: 'O\'smoqda',
    color: 'from-indigo-500 to-violet-600',
  },
]

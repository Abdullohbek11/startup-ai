import type { User, StartupIdea, Advertisement, Advertiser } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aziz Karimov',
    email: 'aziz@example.com',
    role: 'user',
    city: 'Toshkent',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@validator.uz',
    role: 'admin',
    city: 'Toshkent',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Tech Solutions LLC',
    email: 'info@techsolutions.uz',
    role: 'advertiser',
    city: 'Toshkent',
    createdAt: '2024-02-01T10:00:00Z'
  }
]

export const mockAdvertisers: Advertiser[] = [
  {
    id: '1',
    companyName: 'UzFood Suppliers',
    description: 'O\'zbekistonning eng yirik oziq-ovqat yetkazib beruvchisi. 15 yillik tajriba.',
    phone: '+998 90 123 45 67',
    website: 'https://uzfood.uz',
    city: 'Toshkent'
  },
  {
    id: '2',
    companyName: 'TechEquip Pro',
    description: 'Restoran va kafe jihozlari. Import va mahalliy ishlab chiqarish.',
    phone: '+998 91 234 56 78',
    website: 'https://techequip.uz',
    city: 'Samarqand'
  },
  {
    id: '3',
    companyName: 'Digital Marketing UZ',
    description: 'Raqamli marketing xizmatlari. SMM, SEO, kontekst reklama.',
    phone: '+998 93 345 67 89',
    website: 'https://digitaluz.com',
    city: 'Toshkent'
  },
  {
    id: '4',
    companyName: 'FastLogistics',
    description: 'Butun O\'zbekiston bo\'ylab yetkazib berish xizmati.',
    phone: '+998 94 456 78 90',
    website: 'https://fastlog.uz',
    city: 'Toshkent'
  }
]

export const mockAdvertisements: Advertisement[] = [
  {
    id: '1',
    advertiserId: '1',
    title: 'Oziq-ovqat mahsulotlari yetkazib berish',
    description: 'Restoranlar va kafeler uchun sifatli oziq-ovqat mahsulotlari. Kunlik yetkazib berish, arzon narxlar.',
    category: 'suppliers',
    price: 0,
    city: 'Toshkent',
    createdAt: '2024-03-01T10:00:00Z',
    status: 'approved',
    views: 1250,
    advertiser: mockAdvertisers[0]
  },
  {
    id: '2',
    advertiserId: '2',
    title: 'Restoran jihozlari - 20% chegirma',
    description: 'Professional oshxona jihozlari. Pechlar, muzlatgichlar, oshxona texnikasi. Kafolat 2 yil.',
    category: 'equipment',
    price: 5000000,
    city: 'Samarqand',
    createdAt: '2024-03-05T10:00:00Z',
    status: 'approved',
    views: 890,
    advertiser: mockAdvertisers[1]
  },
  {
    id: '3',
    advertiserId: '3',
    title: 'SMM va reklama xizmatlari',
    description: 'Instagram, Telegram, Facebook reklama. Yangi mijozlar jalb qilish. Oylik paketlar.',
    category: 'marketing',
    price: 2000000,
    city: 'Toshkent',
    createdAt: '2024-03-10T10:00:00Z',
    status: 'approved',
    views: 2100,
    advertiser: mockAdvertisers[2]
  },
  {
    id: '4',
    advertiserId: '4',
    title: 'Express yetkazib berish xizmati',
    description: 'Butun O\'zbekiston bo\'ylab 24 soat ichida yetkazib berish. Korporativ tariflar.',
    category: 'logistics',
    price: 500000,
    city: 'Toshkent',
    createdAt: '2024-03-15T10:00:00Z',
    status: 'approved',
    views: 1560,
    advertiser: mockAdvertisers[3]
  },
  {
    id: '5',
    advertiserId: '1',
    title: 'Franchayzing imkoniyati - Fast Food',
    description: 'Tayyor biznes modeli. O\'qitish, jihozlar, brending. Investitsiya 50 mln so\'mdan.',
    category: 'franchise',
    price: 50000000,
    city: 'Andijon',
    createdAt: '2024-03-18T10:00:00Z',
    status: 'approved',
    views: 3200,
    advertiser: mockAdvertisers[0]
  },
  {
    id: '6',
    advertiserId: '2',
    title: 'Biznes konsalting xizmatlari',
    description: 'Biznes reja tuzish, moliyaviy tahlil, bozor tadqiqoti. 10+ yillik tajriba.',
    category: 'consulting',
    price: 3000000,
    city: 'Toshkent',
    createdAt: '2024-03-20T10:00:00Z',
    status: 'approved',
    views: 780,
    advertiser: mockAdvertisers[1]
  }
]

export const mockIdeas: StartupIdea[] = [
  {
    id: '1',
    userId: '1',
    ideaText: 'Toshkentda zamonaviy fast food restoran ochmoqchiman',
    city: 'Toshkent',
    businessType: 'Fast Food',
    score: 78,
    createdAt: '2024-03-01T10:00:00Z',
    analysisResult: {
      profitability: 78,
      risk: 'medium',
      estimatedCost: {
        min: 150000000,
        max: 300000000,
        currency: 'UZS'
      },
      competitors: ['Evos', 'Max Way', 'Burger King', 'KFC'],
      marketingStrategy: [
        'Instagram va Telegram orqali reklama',
        'Yetkazib berish xizmati bilan hamkorlik',
        'Ochilish aksiyalari',
        'Sodiqlik dasturi'
      ],
      advice: [
        'Trafik yuqori joylarni tanlang',
        'Menyu sifatiga e\'tibor bering',
        'Xodimlarni professional o\'qiting',
        'Gigiyena standartlarini saqlang'
      ],
      recommendedLocations: [
        'Chorsu atrofi',
        'Yunusobod tumani',
        'Minor atrofi'
      ],
      marketDemand: 'high',
      timeToProfit: '8-12 oy'
    }
  },
  {
    id: '2',
    userId: '1',
    ideaText: 'Samarqandda turistlar uchun mehmonxona ochmoqchiman',
    city: 'Samarqand',
    businessType: 'Xizmat ko\'rsatish',
    score: 85,
    createdAt: '2024-03-10T10:00:00Z',
    analysisResult: {
      profitability: 85,
      risk: 'low',
      estimatedCost: {
        min: 500000000,
        max: 1500000000,
        currency: 'UZS'
      },
      competitors: ['City Palace', 'Registan Plaza', 'Dilimah'],
      marketingStrategy: [
        'Booking.com va TripAdvisor ro\'yxatdan o\'tish',
        'Xalqaro turizm ko\'rgazmalarida qatnashish',
        'Ijtimoiy tarmoqlar marketingi'
      ],
      advice: [
        'Tarixiy joylardan yaqin masofa tanlang',
        'Ingliz va rus tilida xizmat ko\'rsating',
        'Online band qilish tizimini joriy eting'
      ],
      recommendedLocations: [
        'Registon maydoni yaqinida',
        'Shohizinda yaqinida',
        'Markaziy ko\'cha'
      ],
      marketDemand: 'high',
      timeToProfit: '18-24 oy'
    }
  }
]

export const statsData = {
  totalUsers: 12450,
  totalIdeas: 8920,
  totalAdvertisements: 156,
  totalCities: 13,
  popularBusinessTypes: [
    { name: 'Fast Food', count: 2340 },
    { name: 'Kiyim do\'koni', count: 1890 },
    { name: 'Kafe', count: 1560 },
    { name: 'IT kompaniya', count: 1230 },
    { name: 'Go\'zallik saloni', count: 980 }
  ],
  activeCities: [
    { name: 'Toshkent', count: 4560 },
    { name: 'Samarqand', count: 1230 },
    { name: 'Buxoro', count: 890 },
    { name: 'Andijon', count: 780 },
    { name: 'Farg\'ona', count: 650 }
  ]
}

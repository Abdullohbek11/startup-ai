export type UserRole = 'user' | 'admin' | 'advertiser'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  city: string
  createdAt: string
}

export interface StartupIdea {
  id: string
  userId: string
  ideaText: string
  city: string
  businessType: string
  analysisResult: AnalysisResult | null
  score: number
  createdAt: string
}

export interface AnalysisResult {
  profitability: number
  risk: 'low' | 'medium' | 'high'
  estimatedCost: {
    min: number
    max: number
    currency: string
  }
  competitors: string[]
  marketingStrategy: string[]
  advice: string[]
  recommendedLocations: string[]
  marketDemand: 'low' | 'medium' | 'high'
  timeToProfit: string
}

export interface Advertiser {
  id: string
  companyName: string
  description: string
  phone: string
  website: string
  city: string
  logo?: string
}

export interface Advertisement {
  id: string
  advertiserId: string
  title: string
  description: string
  category: AdvertisementCategory
  price: number
  city: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
  views: number
  advertiser?: Advertiser
}

export type AdvertisementCategory = 
  | 'suppliers'
  | 'equipment'
  | 'marketing'
  | 'franchise'
  | 'logistics'
  | 'consulting'
  | 'finance'
  | 'legal'

export const CITIES = [
  'Toshkent',
  'Andijon',
  'Buxoro',
  'Farg\'ona',
  'Jizzax',
  'Namangan',
  'Navoiy',
  'Qashqadaryo',
  'Samarqand',
  'Sirdaryo',
  'Surxondaryo',
  'Xorazm',
  'Qoraqalpog\'iston'
] as const

export const BUSINESS_TYPES = [
  'Restoran',
  'Kafe',
  'Fast Food',
  'Do\'kon',
  'Kiyim do\'koni',
  'Elektronika do\'koni',
  'Oziq-ovqat do\'koni',
  'Xizmat ko\'rsatish',
  'IT kompaniya',
  'Marketing agentlik',
  'Ta\'lim markazi',
  'Sport zal',
  'Go\'zallik saloni',
  'Avtoservis',
  'Qurilish',
  'Ishlab chiqarish',
  'Qishloq xo\'jaligi',
  'Boshqa'
] as const

export const CATEGORY_LABELS: Record<AdvertisementCategory, string> = {
  suppliers: 'Yetkazib beruvchilar',
  equipment: 'Jihozlar',
  marketing: 'Marketing',
  franchise: 'Franchayzing',
  logistics: 'Logistika',
  consulting: 'Konsalting',
  finance: 'Moliya',
  legal: 'Yuridik'
}

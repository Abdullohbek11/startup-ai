import type { AnalysisResult } from './types'

// Ichki fallback – AI ishlamasa shu ishlaydi
async function fallbackAnalyzeBusinessIdea(ideaText: string, city: string): Promise<AnalysisResult> {
  // Parse business type from idea text
  const lowerIdea = ideaText.toLowerCase()
  
  // Determine business category and generate relevant analysis
  let profitability = 70 + Math.floor(Math.random() * 25)
  let risk: 'low' | 'medium' | 'high' = 'medium'
  let minCost = 100000000
  let maxCost = 300000000
  let marketDemand: 'low' | 'medium' | 'high' = 'medium'
  let timeToProfit = '12-18 oy'
  let competitors: string[] = []
  let marketingStrategy: string[] = []
  let advice: string[] = []
  let recommendedLocations: string[] = []

  // Food/Restaurant related
  if (lowerIdea.includes('restoran') || lowerIdea.includes('kafe') || lowerIdea.includes('fast food') || lowerIdea.includes('oshxona')) {
    profitability = 72 + Math.floor(Math.random() * 18)
    risk = profitability > 80 ? 'low' : 'medium'
    minCost = 150000000
    maxCost = 500000000
    marketDemand = 'high'
    timeToProfit = '8-14 oy'
    competitors = ['Evos', 'Max Way', 'Rayhon', 'Milliy taomlar', 'Mahalliy kafelar']
    marketingStrategy = [
      'Instagram va Telegram kanallar orqali faol reklama',
      'Yandex Eda va Wolt bilan hamkorlik',
      'Ochilish kunida maxsus aksiyalar',
      'Sodiqlik dasturi va bonuslar',
      'Food bloggerlar bilan hamkorlik'
    ]
    advice = [
      'Yuqori oqimli joylarda joy tanlang',
      'Menyu sifati va xilma-xilligiga e\'tibor bering',
      'Xodimlarni professional o\'qiting',
      'Gigiyena standartlarini qat\'iy saqlang',
      'Online buyurtma tizimini joriy eting'
    ]
    recommendedLocations = [
      `${city} markazi`,
      'Savdo markazlari yonida',
      'Universitet va maktablar atrofida',
      'Biznes markazlar yonida'
    ]
  }
  // Clothing store
  else if (lowerIdea.includes('kiyim') || lowerIdea.includes('do\'kon') || lowerIdea.includes('butik')) {
    profitability = 65 + Math.floor(Math.random() * 20)
    risk = 'medium'
    minCost = 80000000
    maxCost = 250000000
    marketDemand = 'high'
    timeToProfit = '10-16 oy'
    competitors = ['LC Waikiki', 'Zara', 'H&M', 'Mahalliy butiklar', 'Bozorlar']
    marketingStrategy = [
      'Instagram do\'kon ochish va faol yuritish',
      'Influencerlar bilan hamkorlik',
      'Chegirmalar va aksiyalar',
      'Telegram kanalda yangiliklar',
      'Yetkazib berish xizmati'
    ]
    advice = [
      'O\'ziga xos stil tanlang (casual, klassik, sport)',
      'Sifatli va arzon narxdagi tovarlarni tanlang',
      'Mijozlarga yaxshi xizmat ko\'rsating',
      'Mavsumiy kolleksiyalarni kuzatib boring',
      'Online savdo imkoniyatini qo\'shing'
    ]
    recommendedLocations = [
      `${city} markaziy bozori`,
      'Savdo markazlari',
      'Yosh avlod ko\'p joylarda',
      'Turar joy massivlari'
    ]
  }
  // IT / Tech company
  else if (lowerIdea.includes('it') || lowerIdea.includes('dastur') || lowerIdea.includes('texnolog') || lowerIdea.includes('app')) {
    profitability = 80 + Math.floor(Math.random() * 15)
    risk = 'medium'
    minCost = 50000000
    maxCost = 200000000
    marketDemand = 'high'
    timeToProfit = '12-24 oy'
    competitors = ['Epam', 'Exadel', 'Fido-Biznes', 'Uzum', 'Mahalliy startuplar']
    marketingStrategy = [
      'LinkedIn va professional tarmoqlar',
      'IT tadbirlarda ishtirok etish',
      'Portfolio saytini yaratish',
      'B2B marketing strategiyasi',
      'Clutch va Upwork profillar'
    ]
    advice = [
      'Tor yo\'nalishni tanlang (mobil, web, AI)',
      'Sifatli jamoa tuzing',
      'Portfoylioni asta-sekin kengaytiring',
      'Xalqaro bozorga chiqishni rejalashtiring',
      'Doimiy o\'rganish va rivojlanish'
    ]
    recommendedLocations = [
      'IT Park Toshkent',
      'Koworking markazlar',
      'Online / remote ishlash',
      'Biznes markazlar'
    ]
  }
  // Beauty / Salon
  else if (lowerIdea.includes('go\'zallik') || lowerIdea.includes('salon') || lowerIdea.includes('sartaroshxona')) {
    profitability = 70 + Math.floor(Math.random() * 18)
    risk = 'low'
    minCost = 60000000
    maxCost = 180000000
    marketDemand = 'high'
    timeToProfit = '6-12 oy'
    competitors = ['Dolce Vita', 'Bellissimo', 'Mahalliy salonlar', 'Uy shiroitida xizmatlar']
    marketingStrategy = [
      'Instagram portfolio yaratish',
      'Before/After rasmlar',
      'Mijozlar sharhlari',
      'Telegram bot orqali band qilish',
      'Sodiqlik kartasi'
    ]
    advice = [
      'Professional uskunalar sotib oling',
      'Mutaxassislarni muntazam o\'qiting',
      'Sifatli kosmetika vositalari ishlating',
      'Qulay va zamonaviy interyerni yarating',
      'Online band qilish tizimini joriy eting'
    ]
    recommendedLocations = [
      `${city} turar joy massivlari`,
      'Savdo markazlari ichida',
      'Markaziy ko\'chalarda',
      'Biznes markazlar yonida'
    ]
  }
  // Education / Training center
  else if (lowerIdea.includes('ta\'lim') || lowerIdea.includes('o\'quv') || lowerIdea.includes('kurs') || lowerIdea.includes('markaz')) {
    profitability = 75 + Math.floor(Math.random() * 15)
    risk = 'low'
    minCost = 40000000
    maxCost = 150000000
    marketDemand = 'high'
    timeToProfit = '4-8 oy'
    competitors = ['Cambridge', 'Registon', 'IT Park kurslari', 'Mahalliy markazlar']
    marketingStrategy = [
      'Bepul ochiq darslar',
      'Telegram va Instagram reklama',
      'Maktablar bilan hamkorlik',
      'Bitiruvchilar muvaffaqiyatlari',
      'Referral dasturi'
    ]
    advice = [
      'Talab yuqori yo\'nalishni tanlang (ingliz tili, IT, IELTS)',
      'Sifatli o\'qituvchilarni jalb qiling',
      'Zamonaviy o\'quv dasturlarini tayyorlang',
      'Online va offline formatda ishlang',
      'Sertifikatlar bering'
    ]
    recommendedLocations = [
      'Maktablar yonida',
      'Universitetlar yaqinida',
      'Metro bekatlari yonida',
      `${city} markazi`
    ]
  }
  // Default / General
  else {
    profitability = 65 + Math.floor(Math.random() * 20)
    risk = Math.random() > 0.5 ? 'medium' : 'low'
    marketDemand = Math.random() > 0.3 ? 'medium' : 'high'
    competitors = ['Mahalliy raqobatchilar', 'Yirik kompaniyalar', 'Online xizmatlar']
    marketingStrategy = [
      'Ijtimoiy tarmoqlarda reklama',
      'Google va Yandex reklama',
      'Mahalliy tadbirlarda ishtirok',
      'Sodiqlik dasturi',
      'Tavsiya marketing'
    ]
    advice = [
      'Bozor tadqiqoti o\'tkazing',
      'Raqobatchillarni o\'rganing',
      'Maqsadli auditoriyani aniqlang',
      'Moliyaviy rejani tuzing',
      'Boshlang\'ich mijozlar bazasini yarating'
    ]
    recommendedLocations = [
      `${city} markazi`,
      'Gavjum joylar',
      'Savdo markazlari',
      'Turar joy massivlari'
    ]
  }

  // City-based adjustments
  if (city === 'Toshkent') {
    profitability = Math.min(profitability + 5, 95)
    minCost = Math.round(minCost * 1.3)
    maxCost = Math.round(maxCost * 1.3)
  } else if (city === 'Samarqand' || city === 'Buxoro') {
    profitability = Math.min(profitability + 3, 95)
    if (lowerIdea.includes('turist') || lowerIdea.includes('mehmonxona')) {
      profitability = Math.min(profitability + 10, 95)
      marketDemand = 'high'
    }
  }

  return {
    profitability,
    risk,
    estimatedCost: {
      min: minCost,
      max: maxCost,
      currency: 'UZS',
    },
    competitors,
    marketingStrategy,
    advice,
    recommendedLocations,
    marketDemand,
    timeToProfit,
  }
}

// Asosiy funksiya – avval serverdagi AI API ga murojaat qiladi, bo‘lmasa fallback
export async function analyzeBusinessIdea(ideaText: string, city: string): Promise<AnalysisResult> {
  try {
    const res = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ideaText, city }),
    })

    if (res.ok) {
      const data = (await res.json()) as AnalysisResult
      return data
    }
  } catch {
    // AI ishlamasa – fallback ga tushamiz
  }

  // Fallback – eski heuristik tahlil
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return fallbackAnalyzeBusinessIdea(ideaText, city)
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} mlrd`
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} mln`
  }
  return amount.toLocaleString('uz-UZ')
}

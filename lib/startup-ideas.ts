/**
 * AI tahlil qilingan — hozirda eng yaxshi startup va biznes g'oyalari.
 * Yangi loyihalar (hozir ishlayotgan emas), marketplace "Real loyihalar" bo'limi uchun.
 */
export interface StartupIdeaCard {
  id: string
  title: string
  tagline: string
  description: string
  sector: string
  city: string
  whyGood: string
  potential: string
  color: string
}

export const startupIdeas: StartupIdeaCard[] = [
  {
    id: '1',
    title: 'Eco-friendly restoran tarmog\'i',
    tagline: 'Organik va mahalliy mahsulotlar asosida ovqat',
    description: 'Toshkent va yirik shaharlarda atrof-muhitga yo\'naltirilgan restoranlar. Mahalliy fermerlar bilan to\'g\'ridan-to\'g\'ri shartnoma, zero-waste prinsiplari.',
    sector: 'Restoran · Ekologiya',
    city: 'Toshkent',
    whyGood: 'Talab o\'smoqda, raqobat past, import qaramlikni kamaytiradi.',
    potential: 'Yuqori rentabellik, franchayzing imkoniyati.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: '2',
    title: 'Agrotech — dehqonlar uchun platforma',
    tagline: 'Ekin narxlari, ob-havo, kredit va sotuv',
    description: 'Dehqonlar uchun bitta ilovada: ekin narxlari, ob-havo bashorati, mikrokredit, mahsulotni xaridorlarga sotish. O\'zbekiston qishloq xo\'jaligini raqamlashtirish.',
    sector: 'Agrotech · Fintech',
    city: 'Toshkent',
    whyGood: 'Katta auditoriya, davlat qo\'llab-quvvatlaydi, bo\'sh bozor.',
    potential: 'Milliy miqyosda o\'sish, eksport imkoniyati.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: '3',
    title: 'Bolalar uchun kodlash va STEM maktabi',
    tagline: '7–16 yosh uchun dasturlash va robototexnika',
    description: 'O\'zbekistonda bolalar uchun zamonaviy kodlash, robototexnika va matematika kurslari. Onlayn va offline. O\'qituvchilar sertifikatlangan.',
    sector: 'EdTech',
    city: 'Toshkent',
    whyGood: 'Ota-onalar talabi yuqori, raqobat hali kam.',
    potential: 'Franchayzing, davlat maktablari bilan hamkorlik.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: '4',
    title: 'Mahalliy mehmonxona va B&B platformasi',
    tagline: 'Samarqand, Buxoro, Xiva — uy-joy ijarasi',
    description: 'Turistlar uchun mahalliy uy-joy va B&B ro\'yxati. Xostlar uchun trening, to\'lov tizimi va sug\'urta. O\'zbekiston turizmi o\'sishda.',
    sector: 'Turizm · Proptech',
    city: 'Samarqand',
    whyGood: 'Turizm o\'smoqda, Airbnb kabi mahalliy yechim talab qilinadi.',
    potential: 'Butun mamlakat va Qozog\'iston, Qirg\'iziston bilan kengayish.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: '5',
    title: 'Kichik biznes uchun buxgalteriya ilovasi',
    tagline: 'Soliq, hisobot, FОФ va to\'lovlar bitta joyda',
    description: 'YaMM va kichik biznes uchun soddalashtirilgan buxgalteriya va soliq hisoboti. Soliq.uz va 1С bilan integratsiya, avtomatik hisobotlar.',
    sector: 'Fintech · SaaS',
    city: 'Toshkent',
    whyGood: 'Kichik bizneslar ko\'p, mavjud yechimlar qimmat yoki murakkab.',
    potential: 'Sotuv ob\'yektiv yuqori, subscription model.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: '6',
    title: 'Tibbiy xizmatlar va narxlarni taqqoslash',
    tagline: 'Shifokorlar, klinikalar, narxlar va sharhlar',
    description: 'Bemorlar uchun klinika va shifokorlarni qidirish, narxlarni taqqoslash, onlayn yozilish. Shifokorlar uchun reklama va jadval boshqaruvi.',
    sector: 'HealthTech',
    city: 'Toshkent',
    whyGood: 'Sog\'liqni saqlash raqamlashtirilmoqda, ma\'lumotlar tarqoq.',
    potential: 'Davlat va xususiy klinikalar bilan hamkorlik.',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: '7',
    title: 'Logistika va yetkazib berish — B2B platforma',
    tagline: 'Do\'konlar va ishlab chiqaruvchilar uchun bir joyda yetkazib berish',
    description: 'Chakana do\'konlar va ishlab chiqaruvchilar uchun bitta platformada buyurtma, saqlash va yetkazib berish. Narxlarni pasaytirish, vaqtni tejash.',
    sector: 'Logistika · B2B',
    city: 'Toshkent',
    whyGood: 'B2B logistika hali noaniq, katta iqtisodiy ta\'sir.',
    potential: 'Hududiy kengayish, ombor tarmog\'i.',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: '8',
    title: 'Qayta ishlash va second-hand platformasi',
    tagline: 'Kiyim, elektronika va uy buyumlari — qayta aylantirish',
    description: 'Ishlatilgan tovarlarni sotish va sotib olish. Ekologik ta\'sir, arzon narxlar. Kiyim, elektronika, uy-ro\'zg\'or uchun alohida kategoriyalar.',
    sector: 'E-commerce · Ekologiya',
    city: 'Toshkent',
    whyGood: 'Yoshlar va tejamkor xaridorlar uchun talab o\'smoqda.',
    potential: 'Frilans va C2C komissiya, brend hamkorliklari.',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: '9',
    title: 'Ona va bola uchun to\'liq xizmat markazi',
    tagline: 'Homiladorlik, tug\'ruqxona, pediatr, psixolog',
    description: 'Onagina va bolalar uchun bitta joyda: shifokorlar, kurslar, mahsulotlar va maslahat. Onlayn va offline. Ekspertlar jamoasi.',
    sector: 'HealthTech · EdTech',
    city: 'Toshkent',
    whyGood: 'Demografik o\'sish, ota-onalar xizmatga tayyor to\'lashadi.',
    potential: 'Premium obuna va mahsulot sotuvi.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: '10',
    title: 'Eksport va import broker platformasi',
    tagline: 'O\'zbekiston kompaniyalari uchun chet el bilan savdo',
    description: 'Mahalliy kompaniyalarga eksport/import bo\'yicha broker, logistika va to\'lov yechimlari. Bojxona, sertifikatlar va kontraktlar yordami.',
    sector: 'B2B · Logistika',
    city: 'Toshkent',
    whyGood: 'Eksport o\'smoqda, ko\'pchilik murakkablikdan qo\'rqadi.',
    potential: 'Komissiya va premium xizmatlar.',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: '11',
    title: 'O\'zbek oshxona mahsulotlari — D2C brend',
    tagline: 'Milliy taomlar va souslar — to\'g\'ridan-to\'g\'ri xaridorga',
    description: 'O\'zbek oshxona an\'analariga asoslangan tayyor mahsulotlar va souslar. Onlayn va chakana savdo. Eksport imkoniyati.',
    sector: 'F&B · E-commerce',
    city: 'Toshkent',
    whyGood: 'Milliy brend talabi, turistik eksport potentsiali.',
    potential: 'Xalqaro eksport va franchayzing.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: '12',
    title: 'Freelancer va tadbirkorlar uchun jamoa platformasi',
    tagline: 'Loyihalar, jamoa yig\'ish va to\'lovlar bitta joyda',
    description: 'Freelancerlar va kichik kompaniyalar uchun loyiha boshqaruvi, jamoa yig\'ish va to\'lovlar. O\'zbekiston va MDH bozoriga mo\'ljallangan.',
    sector: 'SaaS · Freelance',
    city: 'Toshkent',
    whyGood: 'Remote ish o\'smoqda, mahalliy yechimlar kam.',
    potential: 'Obuna va tranzaksiya komissiyasi.',
    color: 'from-cyan-500 to-blue-600',
  },
]

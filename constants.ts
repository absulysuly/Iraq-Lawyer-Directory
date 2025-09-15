import { Governorate, PracticeArea, Lawyer, ClientMessage } from './types';

export const GOVERNORATES: Governorate[] = [
  { id: 'anbar', name: { en: 'Al-Anbar', ar: 'الأنبار', ku: 'Enbar' } },
  { id: 'babil', name: { en: 'Babil', ar: 'بابل', ku: 'Babîl' } },
  { id: 'baghdad', name: { en: 'Baghdad', ar: 'بغداد', ku: 'Bexda' } },
  { id: 'basra', name: { en: 'Basra', ar: 'البصرة', ku: 'Besra' } },
  { id: 'dhi_qar', name: { en: 'Dhi Qar', ar: 'ذي قار', ku: 'Zîqar' } },
  { id: 'qadisiyyah', name: { en: 'Al-Qadisiyyah', ar: 'القادسية', ku: 'Qadisiye' } },
  { id: 'diyala', name: { en: 'Diyala', ar: 'ديالى', ku: 'Diyala' } },
  { id: 'dohuk', name: { en: 'Dohuk', ar: 'دهوك', ku: 'Duhok' } },
  { id: 'erbil', name: { en: 'Erbil', ar: 'أربيل', ku: 'Hewlêr' } },
  { id: 'karbala', name: { en: 'Karbala', ar: 'كربلاء', ku: 'Kerbela' } },
  { id: 'kirkuk', name: { en: 'Kirkuk', ar: 'كركوك', ku: 'Kerkûk' } },
  { id: 'maysan', name: { en: 'Maysan', ar: 'ميسان', ku: 'Meysan' } },
  { id: 'muthanna', name: { en: 'Al-Muthanna', ar: 'المثنى', ku: 'Muthanna' } },
  { id: 'najaf', name: { en: 'Najaf', ar: 'النجف', ku: 'Necef' } },
  { id: 'nineveh', name: { en: 'Nineveh', ar: 'نينوى', ku: 'Neynewa' } },
  { id: 'saladin', name: { en: 'Saladin', ar: 'صلاح الدين', ku: 'Selahedîn' } },
  { id: 'sulaymaniyah', name: { en: 'Sulaymaniyah', ar: 'السليمانية', ku: 'Silêmanî' } },
  { id: 'wasit', name: { en: 'Wasit', ar: 'واسط', ku: 'Wasit' } },
  { id: 'halabja', name: { en: 'Halabja', ar: 'حلبجة', ku: 'Helebce' } },
];

export const PRACTICE_AREAS: PracticeArea[] = [
    { id: 'family', name: { en: 'Personal Status / Family Law', ar: 'الأحوال الشخصية', ku: 'یاسای باری کەسی' } },
    { id: 'civil', name: { en: 'Civil Law / Civil Litigation', ar: 'القانون المدني', ku: 'یاسای شارستانی' } },
    { id: 'criminal', name: { en: 'Criminal Law', ar: 'القانون الجنائي', ku: 'یاسای سزایی' } },
    { id: 'commercial', name: { en: 'Commercial Law / Corporate Law', ar: 'القانون التجاري', ku: 'یاسای بازرگانی' } },
    { id: 'labor', name: { en: 'Labor Law / Employment Disputes', ar: 'قانون العمل', ku: 'یاسای کار' } },
    { id: 'real_estate', name: { en: 'Real Estate / Property Law', ar: 'قانون العقارات', ku: 'یاسای خانووبەرە' } },
    { id: 'ip', name: { en: 'Intellectual Property', ar: 'الملكية الفكرية', ku: 'مافی خاوەندارێتی هزری' } },
    { id: 'banking', name: { en: 'Banking & Finance Law', ar: 'القانون المصرفي', ku: 'یاسای بانک و دارایی' } },
    { id: 'tax', name: { en: 'Tax Law', ar: 'القانون الضريبي', ku: 'یاسای باج' } },
    { id: 'admin', name: { en: 'Administrative Law', ar: 'القانون الإداري', ku: 'یاسای کارگێڕی' } },
    { id: 'dispute', name: { en: 'Litigation & Dispute Resolution', ar: 'التقاضي وحل النزاعات', ku: 'داواکاری و چارەسەرکردنی کێشەکان' } },
];

const firstNames = ["Ahmed", "Fatima", "Ali", "Zahra", "Mohammed", "Noor", "Mustafa", "Sara", "Hassan", "Maryam"];
const lastNames = ["Al-Jabri", "Al-Maliki", "Al-Saadi", "Al-Hamdani", "Al-Dulaimi", "Al-Obeidi", "Al-Shammari", "Al-Zubaidi", "Al-Khafaji", "Al-Yasiri"];

const generateMockLawyers = (count: number): Lawyer[] => {
    const lawyers: Lawyer[] = [];
    for (let i = 0; i < count; i++) {
        const governorate = GOVERNORATES[i % GOVERNORATES.length];
        const practiceAreas = [...PRACTICE_AREAS].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
        const experience = Math.floor(Math.random() * 30) + 1;
        
        lawyers.push({
            id: `lawyer-${i + 1}`,
            name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
            avatarUrl: `https://picsum.photos/seed/${i+1}/200`,
            governorate,
            practiceAreas,
            experience,
            bio: {
              en: `A dedicated lawyer with ${experience} years of experience specializing in ${practiceAreas.map(p => p.name.en).join(', ')}. Committed to providing excellent legal services in ${governorate.name.en}.`,
              ar: `محامٍ متفانٍ يتمتع بخبرة ${experience} عامًا ومتخصص في ${practiceAreas.map(p => p.name.ar).join('، ')}. ملتزم بتقديم خدمات قانونية ممتازة في ${governorate.name.ar}.`,
              ku: `پارێزەرێکی دڵسۆز بە ${experience} ساڵ ئەزموون لە بواری ${practiceAreas.map(p => p.name.ku).join('، ')}. پابەندە بە پێشکەشکردنی خزمەتگوزاری یاسایی نایاب لە ${governorate.name.ku}.`,
            },
            contact: {
                email: `lawyer${i+1}@example.com`,
                phone: `+964-770-123-45${i.toString().padStart(2, '0')}`,
                whatsapp: `+96477012345${i.toString().padStart(2, '0')}`,
            },
            testimonials: [
                { clientName: "Client A", comment: "Very professional and effective.", rating: 5 },
                { clientName: "Client B", comment: "Helped me win my case with great expertise.", rating: 4 }
            ],
            notableCases: [
                { caseName: "Major Corporate Merger", description: "Successfully advised on a high-value merger between two leading companies.", year: 2022 },
                { caseName: "Complex Property Dispute", description: "Resolved a multi-generational land ownership dispute.", year: 2020 }
            ],
            awards: [
                { name: "Lawyer of the Year", year: 2021, issuingBody: "Iraqi Bar Association" }
            ]
        });
    }
    return lawyers;
};


export const MOCK_LAWYERS: Lawyer[] = generateMockLawyers(5);

export const MOCK_MESSAGES: ClientMessage[] = [
    { id: 'msg1', clientName: 'Ali Hassan', subject: 'Consultation on Commercial Law', message: 'Dear Lawyer, I would like to schedule a consultation regarding a new business venture. Please let me know your availability.', timestamp: '2024-07-28T10:30:00Z', isRead: false },
    { id: 'msg2', clientName: 'Fatima Ahmed', subject: 'Question about Property Law', message: 'I have a question about a property I inherited. Can you help me understand the legal process?', timestamp: '2024-07-28T09:15:00Z', isRead: false },
    { id: 'msg3', clientName: 'Yusuf Khalid', subject: 'Urgent: Labor Dispute', message: 'I am facing an issue with my employer and need urgent legal advice. My contract was terminated unfairly.', timestamp: '2024-07-27T17:00:00Z', isRead: true },
    { id: 'msg4', clientName: 'Sara Ibrahim', subject: 'Family Law Inquiry', message: 'I need to inquire about the procedures for child custody. I would appreciate your guidance.', timestamp: '2024-07-27T14:20:00Z', isRead: false },
];
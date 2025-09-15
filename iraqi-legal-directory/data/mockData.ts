import { Lawyer, Conversation } from '../types';
import { GOVERNORATES, PRACTICE_AREAS } from '../constants';

const firstNames = ["Ahmed", "Fatima", "Ali", "Zahra", "Mohammed"];
const lastNames = ["Al-Jabri", "Al-Maliki", "Al-Saadi", "Al-Hamdani", "Al-Dulaimi"];

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
                email: i === 0 ? 'ahmed.hassan@iraqlegal.com' : `lawyer${i+1}@example.com`,
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

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'conv1',
        lawyer: { id: 'lawyer-1', name: 'Ahmed Al-Jabri', avatarUrl: 'https://picsum.photos/seed/1/200'},
        client: { id: 'client-1', name: 'Client User' },
        subject: 'Consultation on Commercial Law',
        messages: [
            { id: 'msg1-1', senderId: 'client-1', text: 'Dear Lawyer, I would like to schedule a consultation regarding a new business venture. Please let me know your availability.', timestamp: '2024-07-28T10:30:00Z'},
            { id: 'msg1-2', senderId: 'lawyer-1', text: 'Thank you for reaching out. I am available tomorrow afternoon. Does 2 PM work for you?', timestamp: '2024-07-28T11:00:00Z'},
        ],
        isReadByLawyer: false,
        isReadByClient: true,
        lastUpdate: '2024-07-28T11:00:00Z',
    },
    {
        id: 'conv2',
        lawyer: { id: 'lawyer-1', name: 'Ahmed Al-Jabri', avatarUrl: 'https://picsum.photos/seed/1/200'},
        client: { id: 'client-2', name: 'Fatima Ahmed' },
        subject: 'Question about Property Law',
        messages: [
            { id: 'msg2-1', senderId: 'client-2', text: 'I have a question about a property I inherited. Can you help me understand the legal process?', timestamp: '2024-07-28T09:15:00Z'},
        ],
        isReadByLawyer: false,
        isReadByClient: true,
        lastUpdate: '2024-07-28T09:15:00Z',
    },
     {
        id: 'conv3',
        lawyer: { id: 'lawyer-2', name: 'Fatima Al-Maliki', avatarUrl: 'https://picsum.photos/seed/2/200'},
        client: { id: 'client-1', name: 'Client User' },
        subject: 'Urgent: Labor Dispute',
        messages: [
            { id: 'msg3-1', senderId: 'client-1', text: 'I am facing an issue with my employer and need urgent legal advice. My contract was terminated unfairly.', timestamp: '2024-07-27T17:00:00Z'},
        ],
        isReadByLawyer: true,
        isReadByClient: true,
        lastUpdate: '2024-07-27T17:00:00Z',
    }
];
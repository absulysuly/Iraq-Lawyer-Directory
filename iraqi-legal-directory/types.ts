export type Language = 'en' | 'ar' | 'ku';
export type Direction = 'ltr' | 'rtl';

export interface User {
  id: string;
  type: 'client' | 'lawyer';
  name: string;
  email: string;
  lawyerProfileId?: string;
}

export interface Governorate {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
}

export interface PracticeArea {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
}

export interface Testimonial {
  clientName: string;
  comment: string;
  rating: number;
}

export interface NotableCase {
  caseName: string;
  description: string;
  year: number;
}

export interface Award {
  name: string;
  year: number;
  issuingBody: string;
}

export interface Lawyer {
  id: string;
  name: string;
  avatarUrl: string;
  governorate: Governorate;
  practiceAreas: PracticeArea[];
  experience: number;
  bio: {
    en: string;
    ar: string;
    ku: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  testimonials: Testimonial[];
  notableCases: NotableCase[];
  awards: Award[];
}

export interface Filters {
  name: string;
  governorates: string[];
  practiceAreas: string[];
  minExperience: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// New messaging structure
export interface Message {
  id: string;
  senderId: string; // 'client-1' or 'user-lawyer-1'
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  lawyer: Pick<Lawyer, 'id' | 'name' | 'avatarUrl'>;
  client: Pick<User, 'id' | 'name'>;
  subject: string;
  messages: Message[];
  isReadByLawyer: boolean;
  isReadByClient: boolean;
  lastUpdate: string;
}
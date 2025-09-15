import { ReactNode } from "react";

export type Language = 'en' | 'ar' | 'ku';
export type Direction = 'ltr' | 'rtl';

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
}

export interface ClientMessage {
  id: string;
  clientName: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

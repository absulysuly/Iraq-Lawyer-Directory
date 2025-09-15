import { Governorate, PracticeArea } from './types';

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
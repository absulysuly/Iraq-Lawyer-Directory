import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

const HeroBanner: React.FC = () => {
  const t = useTranslations();
  
  return (
    <div 
      className="relative bg-cover bg-center rounded-lg overflow-hidden h-64 md:h-80" 
      style={{ backgroundImage: `url('https://picsum.photos/seed/justice/1200/400')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h2 className="text-3xl md:text-5xl font-bold">{t.heroTitle}</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

// Fix: Implement the LawyerProfile component.
import React, { useContext, useState } from 'react';
import { Lawyer } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import { LanguageContext } from '../../context/LanguageContext';
import StarRating from '../ui/StarRating';
import { useAuth } from '../../context/AuthContext';
import SendMessageModal from '../ui/SendMessageModal';

interface LawyerProfileProps {
  lawyer: Lawyer;
  onBack: () => void;
}

const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.258 6.258l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.166l-1.138 4.162 4.273-1.12zM12.07 10.15c-.273 0-.547.098-.737.295l-.423.419c-.218.217-.417.433-.634.625-.218.192-.435.385-.635.562-.218.192-.417.366-.593.518-.194.17-.357.307-.492.406s-.248.163-.33.229c-.082.066-.14.113-.172.147-.032.034-.055.057-.068.07-.023.023-.046.051-.068.084-.023.033-.046.071-.068.113-.023.042-.034.075-.034.098s.011.057.034.099c.023.042.056.084.099.126.043.042.094.084.151.126s.122.08.192.113c.07.034.152.057.246.068.094.012.206.012.336-.011.13-.023.279-.068.446-.135.167-.067.35-.159.549-.279.198-.12.414-.264.646-.432.233-.168.482-.365.748-.591.266-.227.548-.476.847-.748.299-.271.603-.559.912-.862.308-.302.618-.601.931-.896.313-.295.611-.572.895-.83.284-.258.52-.461.708-.608.188-.147.336-.263.445-.347.109-.084.192-.143.249-.176.057-.034.094-.057.113-.068.019-.011.03-.023.03-.023s.023-.011.034-.023c.012-.011.023-.034.034-.056.012-.023.012-.046.012-.068 0-.012-.004-.034-.008-.057s-.008-.033-.008-.033c-.012 0-.023-.011-.034-.023s-.023-.023-.034-.034c-.012-.011-.034-.034-.057-.057-.023-.023-.057-.057-.099-.099-.043-.043-.095-.086-.151-.128-.057-.042-.122-.08-.193-.112a1.18 1.18 0 0 0-.246-.068c-.094-.012-.206-.012-.336.011-.13.023-.279.068-.445.135-.167-.067-.35.159-.549-.279-.198-.12-.414-.264-.646-.432-.233-.168-.482-.365-.748-.591s-.514-.423-.748-.592c-.234-.168-.45-.306-.647-.413-.198-.108-.378-.188-.54-.24-.162-.051-.307-.08-.434-.086-.127-.005-.254 0-.38.011-.127.012-.254.034-.38.068-.126.034-.249.076-.369.128-.12.052-.229.113-.327.184s-.185.151-.26.24c-.075.089-.136.18-.184.271-.048.091-.083.18-.106.268z" />
    </svg>
);

const MessageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const LawyerProfile: React.FC<LawyerProfileProps> = ({ lawyer, onBack }) => {
  const t = useTranslations();
  const { language } = useContext(LanguageContext);
  const { user } = useAuth();
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);

  const TABS = [t.bio, t.practiceAreas, t.testimonials, t.notableCases, t.awards];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const whatsappNumber = lawyer.contact.whatsapp.replace(/\D/g, '');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
      <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:underline">
        &larr; {t.backToSearch}
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 border-b dark:border-gray-700 pb-8">
        <img className="h-40 w-40 rounded-full object-cover shadow-lg" src={lawyer.avatarUrl} alt={lawyer.name} />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{lawyer.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{lawyer.governorate.name[language]}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">{t.experience}:</span> {lawyer.experience} {t.years}</p>
          
           <div className="mt-6 border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t.contact}</h3>
                <div className="flex flex-wrap gap-4 items-center">
                    <a 
                        href={`tel:${lawyer.contact.phone}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <PhoneIcon />
                        <span className="ms-2">{lawyer.contact.phone}</span>
                    </a>
                    <a 
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                    >
                        <WhatsAppIcon />
                        <span className="ms-2">{t.whatsapp}</span>
                    </a>
                    {user?.type === 'client' && (
                        <button
                            onClick={() => setMessageModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <MessageIcon />
                            <span className="ms-2">{t.sendMessage}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === t.bio && (
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p>{lawyer.bio[language]}</p>
          </div>
        )}
        {activeTab === t.practiceAreas && (
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {lawyer.practiceAreas.map(pa => <li key={pa.id}>{pa.name[language]}</li>)}
          </ul>
        )}
        {activeTab === t.testimonials && (
          <div className="space-y-4">
            {lawyer.testimonials.map((testimonial, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <StarRating rating={testimonial.rating} />
                <p className="mt-2 italic text-gray-700 dark:text-gray-300">"{testimonial.comment}"</p>
                <p className="mt-2 text-right font-semibold text-gray-600 dark:text-gray-400">- {testimonial.clientName}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === t.notableCases && (
            <div className="space-y-4">
            {lawyer.notableCases.map((c, i) => (
              <div key={i} className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-700 rounded-r-lg">
                <p className="font-bold text-gray-800 dark:text-gray-200">{c.caseName} ({c.year})</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{c.description}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === t.awards && (
            <div className="space-y-4">
            {lawyer.awards.map((award, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-bold text-gray-800 dark:text-gray-200">{award.name} ({award.year})</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{t.issuingBody}: {award.issuingBody}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SendMessageModal 
        isOpen={isMessageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        lawyer={lawyer}
      />
    </div>
  );
};

export default LawyerProfile;

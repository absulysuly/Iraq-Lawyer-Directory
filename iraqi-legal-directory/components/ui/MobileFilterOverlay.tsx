import React, { ReactNode, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({ isOpen, onClose, title, children }) => {
  const { direction } = useContext(LanguageContext);
  const t = useTranslations();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const panelPositionClass = direction === 'rtl' ? 'right-0' : 'left-0';
  const transformClass =
    direction === 'rtl'
      ? isOpen ? 'translate-x-0' : 'translate-x-full'
      : isOpen ? 'translate-x-0' : '-translate-x-full';


  return (
    <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div 
        className={`fixed top-0 ${panelPositionClass} h-full w-4/5 max-w-sm bg-white dark:bg-gray-800 shadow-xl transform transition-transform ease-in-out duration-300 ${transformClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-panel-title"
      >
        <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center border-b dark:border-gray-700 pb-2 mb-4">
                 <h2 id="filter-panel-title" className="text-lg font-bold">{title}</h2>
                 <button onClick={onClose} className="p-2 text-2xl" aria-label="Close filters">&times;</button>
            </div>
            <div className="flex-grow overflow-y-auto px-2">
              {children}
            </div>
            <div className="mt-4 border-t dark:border-gray-700 pt-4">
                <button onClick={onClose} className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    {t.showResults}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterOverlay;
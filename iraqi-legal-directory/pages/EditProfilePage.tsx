import React, { useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslations } from '../hooks/useTranslations';
import { Language as BioLanguage } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';
import { GoogleGenAI } from "@google/genai";

interface EditProfilePageProps {
    onBackToDashboard: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBackToDashboard }) => {
    const t = useTranslations();
    const { lawyerProfile, updateLawyerProfile } = useAuth();
    const { language } = useContext(LanguageContext);
    
    const [name, setName] = useState(lawyerProfile?.name || '');
    const [phone, setPhone] = useState(lawyerProfile?.contact.phone || '');
    const [whatsapp, setWhatsapp] = useState(lawyerProfile?.contact.whatsapp || '');
    const [bios, setBios] = useState(lawyerProfile?.bio || { en: '', ar: '', ku: '' });
    const [activeBioLang, setActiveBioLang] = useState<BioLanguage>(language);
    
    const [avatarUrl, setAvatarUrl] = useState(lawyerProfile?.avatarUrl || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState('');
    
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if(lawyerProfile) {
            setName(lawyerProfile.name);
            setPhone(lawyerProfile.contact.phone);
            setWhatsapp(lawyerProfile.contact.whatsapp);
            setBios(lawyerProfile.bio);
            setAvatarUrl(lawyerProfile.avatarUrl);
        }
    }, [lawyerProfile]);

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBios(prev => ({ ...prev, [activeBioLang]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateAvatar = async () => {
        if (!lawyerProfile) return;
        setIsGenerating(true);
        setGenerationError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: `A professional, minimalist, and friendly avatar for a lawyer named ${lawyerProfile.name}. The avatar should be suitable for a legal directory profile. Flat design, simple background.`,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '1:1',
                },
            });
    
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
            setAvatarUrl(imageUrl);
    
        } catch (error) {
            console.error("Error generating avatar:", error);
            setGenerationError(t.avatarGenerationError);
            setTimeout(() => setGenerationError(''), 5000);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage('');
        
        await new Promise(res => setTimeout(res, 1000));
        
        const updatedProfile = {
            name,
            avatarUrl,
            contact: {
                ...lawyerProfile?.contact,
                phone,
                whatsapp,
            },
            bio: bios,
        };
        
        updateLawyerProfile(updatedProfile);

        setIsSaving(false);
        setSuccessMessage(t.profileUpdated);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    if (!lawyerProfile) {
        return <div className="text-center p-8"><p>{t.loading}</p></div>
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
            <button onClick={onBackToDashboard} className="mb-6 text-blue-600 dark:text-blue-400 hover:underline">
                &larr; {t.dashboard}
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t.editProfile}</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.profilePicture}</label>
                        <img src={avatarUrl} alt="Profile Avatar" className="h-32 w-32 rounded-full object-cover shadow-md mx-auto" />
                        <div className="pt-2 space-y-2">
                             <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                             <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                                 {t.uploadPicture}
                             </button>
                             <button type="button" onClick={handleGenerateAvatar} disabled={isGenerating} className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                                 {isGenerating ? t.generating : t.generateWithAI}
                             </button>
                             {generationError && <p className="text-red-500 text-xs text-center pt-1">{generationError}</p>}
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <div>
                           <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</label>
                           <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"/>
                         </div>
                          <div>
                           <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.phone}</label>
                           <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"/>
                         </div>
                         <div>
                           <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.whatsapp}</label>
                           <input type="tel" id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"/>
                         </div>
                    </div>
                </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.bio}</label>
                     <div className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md">
                        <div className="flex border-b border-gray-300 dark:border-gray-600">
                            {(['en', 'ar', 'ku'] as BioLanguage[]).map(lang => (
                                <button
                                    key={lang} type="button"
                                    onClick={() => setActiveBioLang(lang)}
                                    className={`flex-1 p-2 text-sm font-medium transition-colors ${activeBioLang === lang ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <textarea
                          id="bio" rows={8} value={bios[activeBioLang]} onChange={handleBioChange} required
                          className="block w-full border-0 rounded-b-md shadow-sm dark:bg-gray-900 focus:ring-0 sm:text-sm"
                        ></textarea>
                     </div>
                  </div>
                
                <div className="flex justify-end items-center gap-4 pt-4 border-t dark:border-gray-700">
                    {successMessage && <p className="text-green-600 dark:text-green-400">{successMessage}</p>}
                    <button
                        type="submit" disabled={isSaving}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {isSaving ? t.loading : t.saveChanges}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;

import React, { createContext, useContext, useState } from 'react';

export type Language = {
  code: string;
  name: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi-en', name: 'Hinglish (Standard)' },
  { code: 'hi-en-bh', name: 'Hinglish (Bhojpuri)' },
  { code: 'hi-en-rj', name: 'Hinglish (Rajasthani)' },
  { code: 'hi-en-mh', name: 'Hinglish (Maharashtrian)' },
  { code: 'hi-en-south', name: 'Hinglish (South Indian)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }
];

type LanguageContextType = {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 
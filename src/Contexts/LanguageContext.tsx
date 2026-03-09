import React, { createContext, useContext, useState } from 'react';
import { translations } from '../Utils/translations';

const LanguageContext = createContext<any>(null);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('sv-SE'); // default Swedish

  const t = (key: string) => translations[language as keyof typeof translations]?.[key as keyof typeof translations[keyof typeof translations]] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
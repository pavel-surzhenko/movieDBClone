import { createContext, useState } from 'react';
import { LanguageContextProps } from '../types/LanguageContextProps';

export const LanguageContext = createContext<LanguageContextProps>({
    language: '',
    setLanguage: () => {},
});

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [language, setLanguage] = useState<string>('en-US');

    // const handleLanguageChange = (language: string) => {
    //     setLanguage(language);
    // };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

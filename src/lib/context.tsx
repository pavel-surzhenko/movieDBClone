import { createContext, useEffect, useState } from 'react';
import { LanguageContextProps } from '../types/LanguageContextProps';

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'en-US',
    setLanguage: () => {},
});

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const ls: Storage | null =
        typeof window !== 'undefined' ? window.localStorage : null;

    const [language, setLanguage] = useState<string>('en-US');

    useEffect(() => {
        const storageLanguage = ls?.getItem('language');
        if (storageLanguage) {
            setLanguage(JSON.parse(storageLanguage));
        }
    }, [ls]);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        ls?.setItem('language', JSON.stringify(newLanguage));
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage: handleLanguageChange }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

import { createContext, startTransition, useEffect, useState } from 'react';
import { contextProps } from '../types/contextProps';
import { movieProps } from '../types/Movie/movieProps';
import { api } from '../api/api';

export const Context = createContext<contextProps>({
    language: 'en-US',
    setLanguage: () => {},
    movies: [],
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const ls: Storage = window.localStorage;
    const storageLanguage = ls?.getItem('language') as 'en-US' | 'uk-UA';

    const [language, setLanguage] = useState<'en-US' | 'uk-UA'>(storageLanguage || 'en-US');
    const [movies, setMovies] = useState<movieProps[]>([]);

    const handleLanguageChange = (newLanguage: 'en-US' | 'uk-UA') => {
        startTransition(() => {
            setLanguage(newLanguage);
            ls?.setItem('language', newLanguage);
        });
    };

    useEffect(() => {
        api.getTrendingAll(language)
            .then((data) => {
                setMovies(data);
            })
            .catch();
    }, [language]);

    return (
        <Context.Provider value={{ language, setLanguage: handleLanguageChange, movies }}>
            {children}
        </Context.Provider>
    );
};

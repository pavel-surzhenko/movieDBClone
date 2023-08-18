import { createContext, useEffect, useState } from 'react';
import { contextProps } from '../types/contextProps';
import { movieProps } from '../types/movieProps';
import { api } from '../api/api';

export const Context = createContext<contextProps>({
    language: 'en-US',
    setLanguage: () => {},
    movies: [],
});

export const ContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const ls: Storage | null =
        typeof window !== 'undefined' ? window.localStorage : null;
    const storageLanguage = ls?.getItem('language');

    const [language, setLanguage] = useState<string>(
        storageLanguage || 'en-US'
    );
    const [movies, setMovies] = useState<movieProps[]>([]);

    console.log(movies);

    useEffect(() => {
        if (storageLanguage) {
            setLanguage(JSON.parse(storageLanguage));
        }
    }, [ls, storageLanguage]);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        ls?.setItem('language', JSON.stringify(newLanguage));
    };

    useEffect(() => {
        api.getTrendingAll(language)
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => console.log(error));
    }, [language]);

    return (
        <Context.Provider
            value={{ language, setLanguage: handleLanguageChange, movies }}
        >
            {children}
        </Context.Provider>
    );
};

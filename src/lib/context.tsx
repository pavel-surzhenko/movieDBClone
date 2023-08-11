import { createContext, useEffect, useState } from 'react';
import { contextProps } from '../types/contextProps1';
import { movieProps } from '../types/movieProps1';
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

    const [language, setLanguage] = useState<string>('en-US');
    const [movies, setMovies] = useState<movieProps[]>([]);

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

    useEffect(() => {
        api.movies
            .getTrendingAll(language)
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

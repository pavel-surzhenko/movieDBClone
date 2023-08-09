import { createContext, useEffect, useState } from 'react';
import { ContextProps } from '../types/ContextProps';
import { MovieProps } from '../types/MovieProps';
import { api } from '../api/api';

export const Context = createContext<ContextProps>({
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
    const [movies, setMovies] = useState<MovieProps[]>([]);

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
            .getTrendingAll()
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Context.Provider
            value={{ language, setLanguage: handleLanguageChange, movies }}
        >
            {children}
        </Context.Provider>
    );
};

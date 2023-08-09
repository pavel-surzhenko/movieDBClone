import { MovieProps } from './MovieProps';

export interface ContextProps {
    language: string;
    setLanguage: (newLanguage: string) => void;
    movies: MovieProps[];
}

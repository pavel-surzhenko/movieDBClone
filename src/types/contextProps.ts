import { movieProps } from './movieProps';

export interface contextProps {
    language: string;
    setLanguage: (newLanguage: string) => void;
    movies: movieProps[];
}

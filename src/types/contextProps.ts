import { movieProps } from './Movie';

export interface contextProps {
    language: string;
    setLanguage: (newLanguage: string) => void;
    movies: movieProps[];
}

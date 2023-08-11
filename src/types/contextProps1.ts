import { movieProps } from './movieProps1';

export interface contextProps {
    language: string;
    setLanguage: (newLanguage: string) => void;
    movies: movieProps[];
}

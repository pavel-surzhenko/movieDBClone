import { movieProps } from './Movie';

export interface contextProps {
    language: 'en-US' | 'uk-UA';
    setLanguage: (newLanguage: 'en-US' | 'uk-UA') => void;
    movies: movieProps[];
}

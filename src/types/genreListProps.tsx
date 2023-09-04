import { genres } from './Movie';

export interface genreListProps {
    selectedGenre: number;
    onGenreChange: (newOption: number) => void;
    genres: genres[];
}

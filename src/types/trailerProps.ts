import { movieProps } from './movieProps';

export interface trailerProps {
    movieDetails: movieProps;
    handleHover: (id: string) => void;
    handleClick: (id: string) => void;
}

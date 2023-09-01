import { movieProps } from '../Movie/movieProps';

export interface trailerProps {
    movieDetails: movieProps;
    handleHover: (id: string) => void;
    handleClick: (id: string) => void;
}

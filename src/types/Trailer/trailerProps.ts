import { movieProps } from '../Movie';

export interface trailerProps {
    movieDetails: movieProps;
    handleHover: (id: string) => void;
    handleClick: (id: string) => void;
}

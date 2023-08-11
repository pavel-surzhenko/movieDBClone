import { movieProps } from './movieProps';

export interface trailerProps {
    link: string;
    movieDetails?: movieProps;
    handleHover: (id: string) => void;
    handleClick: (link: string) => void;
}

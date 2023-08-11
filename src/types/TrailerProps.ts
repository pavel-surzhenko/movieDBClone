import { MovieProps } from './MovieProps';

export interface TrailerProps {
    id: number;
    link: string;
    movieDetails?: MovieProps;
    handleHover: (id: string) => void;
    handleClick: (link: string) => void;
}

import { movieProps } from './Movie';
import { tvProps } from './TV';

export interface movieCollectionProps {
    movie: movieProps | tvProps;
    collection?: number;
}

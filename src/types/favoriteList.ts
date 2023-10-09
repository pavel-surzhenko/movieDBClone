import { movieResponseProps } from './Movie';
import { tvResponseProps } from './TV';

export interface favoriteList {
    'favorite/movies': movieResponseProps;
    'favorite/tv': tvResponseProps;
}

import { movieResponseProps } from '../Movie';
import { tvResponseProps } from '../TV';

export interface listsProps {
    'favorite/movies': movieResponseProps;
    'favorite/tv': tvResponseProps;
    'watchlist/movies': movieResponseProps;
    'watchlist/tv': tvResponseProps;
}

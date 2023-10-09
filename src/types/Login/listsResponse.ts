import { detailsResponse } from '..';
import { movieResponseProps } from '../Movie';
import { tvResponseProps } from '../TV';

export interface listsResponse extends detailsResponse {
    'favorite/movies': movieResponseProps;
    'favorite/tv': tvResponseProps;
}

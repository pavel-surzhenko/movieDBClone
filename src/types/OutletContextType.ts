import { movieCreditsProps, movieDetailProps, movieProps } from './Movie';
import { tvDetailProps, tvProps } from './TV';

export interface OutletContextType {
    movieCredits: movieCreditsProps;
    movieData: movieDetailProps | tvDetailProps;
    recommendations: movieProps[] | tvProps[];
}

import { movieCreditsProps, movieDetailProps, movieProps } from './Movie';
import { tvCreditsProps, tvDetailProps, tvProps } from './TV';

export interface OutletContextType {
    movieCredits: movieCreditsProps | tvCreditsProps;
    movieData: movieDetailProps | tvDetailProps;
    recommendations: movieProps[] | tvProps[];
}

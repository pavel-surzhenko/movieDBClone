import { keywordsProps, linksProps } from '.';
import { movieCreditsProps, movieDetailProps, movieProps, movieProvidersProps } from './Movie';
import { tvDetailProps, tvProps } from './TV';

export interface OutletContextType {
    movieCredits: movieCreditsProps;
    movieData: movieDetailProps | tvDetailProps;
    recommendations: movieProps[] | tvProps[];
    watchProviders: movieProvidersProps;
    keywords: keywordsProps;
    links: linksProps;
}

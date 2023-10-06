import { cast, crew, movieDetailProps, movieProps, movieProvidersProps } from '.';
import { keywordsProps, linksProps } from '..';

export interface movieAllDetailsProps extends movieDetailProps {
    credits: { cast: cast[]; crew: crew[] };
    recommendations: {
        results: movieProps[];
        page: number;
        total_pages: number;
        total_results: number;
    };
    'watch/providers': movieProvidersProps;
    keywords: keywordsProps;
    external_ids: linksProps;
}

import { tvDetailProps, tvProps } from '.';
import { keywordsProps, linksProps } from '..';
import { cast, crew, movieProvidersProps } from '../Movie';

export interface tvAllDetailsProps extends tvDetailProps {
    credits: { cast: cast[]; crew: crew[] };
    recommendations: {
        results: tvProps[];
        page: number;
        total_pages: number;
        total_results: number;
    };
    'watch/providers': movieProvidersProps;
    keywords: keywordsProps;
    external_ids: linksProps;
}

import { tvDetailProps, tvProps } from '.';
import { cast, crew } from '../Movie';

export interface tvAllDetailsProps extends tvDetailProps {
    credits: { cast: cast[]; crew: crew[] };
    recommendations: {
        results: tvProps[];
        page: number;
        total_pages: number;
        total_results: number;
    };
}

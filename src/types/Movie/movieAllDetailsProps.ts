import { cast, crew, movieDetailProps, movieProps } from '.';

export interface movieAllDetailsProps extends movieDetailProps {
    credits: { cast: cast[]; crew: crew[] };
    recommendations: {
        results: movieProps[];
        page: number;
        total_pages: number;
        total_results: number;
    };
}

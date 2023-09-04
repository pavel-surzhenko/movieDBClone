import { movieProps } from './movieProps';

export interface movieResponseProps {
    results: movieProps[];
    page: number;
    total_pages: number;
    total_results: number;
}

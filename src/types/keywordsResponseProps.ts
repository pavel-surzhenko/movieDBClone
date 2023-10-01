import { keywordsProps } from '.';

export interface keywordsResponseProps {
    results: keywordsProps[];
    page: number;
    total_pages: number;
    total_results: number;
}

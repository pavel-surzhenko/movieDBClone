import { keywords } from '.';

export interface keywordsResponseProps {
    results: keywords[];
    page: number;
    total_pages: number;
    total_results: number;
}

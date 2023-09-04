import { tvProps } from './tvProps';

export interface tvResponseProps {
    results: tvProps[];
    page: number;
    total_pages: number;
    total_results: number;
}

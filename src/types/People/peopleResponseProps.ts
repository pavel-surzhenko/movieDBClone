import { peopleProps } from './peopleProps';

export interface peopleResponseProps {
    results: peopleProps[];
    page: number;
    total_pages: number;
    total_results: number;
}

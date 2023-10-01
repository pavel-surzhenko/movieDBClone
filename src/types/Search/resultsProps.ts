import { companyProps } from '.';
import { keywords } from '..';
import { movieProps } from '../Movie';
import { peopleProps } from '../People/peopleProps';
import { tvProps } from '../TV';

export interface resultsProps {
    data: movieProps[] | tvProps[] | peopleProps[] | companyProps[] | keywords[];
    type: string | undefined;
    pageCount: number;
    handlePageChange: (newPage: number) => void;
    page: number;
}
// 'movie' | 'tv' | 'person' | 'collection' | 'company' | 'keyword';

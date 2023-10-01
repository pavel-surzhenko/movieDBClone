import { companyProps } from '.';

export interface companyResponseProps {
    results: companyProps[];
    page: number;
    total_pages: number;
    total_results: number;
}

import { MovieProps } from './MovieProps';

export interface TabProps {
    openTab: number;
    onTabChange: (tabIndex: number, tabLabel: string) => void;
    tabs: string[];
}

export interface TabContainerProps {
    trendingMovies: MovieProps[];
}

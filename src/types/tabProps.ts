import { MovieProps } from './MovieProps';

export interface TabProps {
    openTab: number;
    onTabChange: (tabIndex: number, tabLabel: string) => void;
    tabs: TabObj[];
}

export interface TabContainerProps {
    trendingMovies: MovieProps[];
}

export type TabObj = { key: string; labelEN: string; labelUA: string };

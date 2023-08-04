import { MovieProps } from './MovieProps';
import { TVProps } from './TVProps';

export interface TabProps {
    openTab: number;
    onTabChange: (tabIndex: number, tabLabel: string) => void;
    tabs: TabObj[];
}

export interface TabContainerProps {
    movies: MovieProps[] | TVProps[];
}

export type TabObj = { key: string; labelEN: string; labelUA: string };

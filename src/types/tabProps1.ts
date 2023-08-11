import { movieProps } from './movieProps1';
import { tvProps } from './tvProps1';

export interface tabProps {
    openTab: number;
    onTabChange: (tabIndex: number, tabLabel: string) => void;
    tabs: tabObj[];
}

export interface tabContainerProps {
    movies: movieProps[] | tvProps[];
}

export type tabObj = { key: string; labelEN: string; labelUA: string };

import { movieProps } from './Movie';
import { tvProps } from './TV';

export interface tabProps {
    openTab: number;
    onTabChange: (tabIndex: number, tabLabel: string) => void;
    tabs: tabObj[];
}

export interface tabContainerProps {
    movies: movieProps[] | tvProps[];
}

export type tabObj = { key: string; labelEN: string; labelUA: string };

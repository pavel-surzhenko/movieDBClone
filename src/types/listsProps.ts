export interface listsProps {
    selectedOption: string;
    onOptionChange: (newOption: typeOfLists) => void;
    movieType: 'movie' | 'tv';
}

export type typeOfLists = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

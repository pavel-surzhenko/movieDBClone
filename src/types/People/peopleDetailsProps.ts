import { movieProps } from '../Movie';
import { tvProps } from '../TV';

export interface peopleDetailsProps {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    combined_credits: combined_credits;
    deathday: null | string;
    gender: 0 | 1 | 2 | 3;
    homepage: null | string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

type combined_credits = {
    cast: movieProps[] | tvProps[];
    crew: movieProps[] | tvProps[];
};

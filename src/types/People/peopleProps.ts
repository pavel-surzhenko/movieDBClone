import { movieProps } from '../Movie';
import { tvProps } from '../TV';

export interface peopleProps {
    adult: boolean;
    gender: number;
    id: number;
    known_for: movieProps[] | tvProps[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

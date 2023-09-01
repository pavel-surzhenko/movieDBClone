import { cast, crew } from '../Movie';

export interface tvCreditsProps {
    cast: cast[];
    crew: crew[];
    id: number;
}

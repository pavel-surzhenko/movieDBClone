import { crew } from '../Movie/movieCreditsProps';
export interface tvSeasonDetailProps {
    _id: string;
    air_date: string;
    episodes: episod[];
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

type episod = {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: crew[] | [];
    guest_stars: [];
};

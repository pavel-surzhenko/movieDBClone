export interface tvDetailProps {
    adult: boolean;
    backdrop_path: string;
    created_by: createdBy[];
    episode_run_time: [];
    first_air_date: string;
    genres: genres[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: episode;
    name: string;
    next_episode_to_air: episode;
    networks: networks[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: companies[];
    production_countries: countries[];
    seasons: seasons[];
    spoken_languages: languages[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

type createdBy = {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
};

type genres = {
    id: number;
    name: string;
};
type episode = {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
};
type networks = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};
type companies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};
type countries = {
    iso_3166_1: string;
    name: string;
};
type seasons = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
};
type languages = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

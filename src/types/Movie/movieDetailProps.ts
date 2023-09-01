import { movieCreditsProps } from './movieCreditsProps';
import { movieProps } from './movieProps';
import { tvCreditsProps } from '../TV/tvCreditsProps';
import { tvDetailProps } from '../TV/tvDetailProps';
import { tvProps } from '../TV/tvProps';

export interface movieDetailProps {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: collection | null;
    budget: number;
    genres: genres[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: 0.5;
    poster_path: string | null;
    production_companies: production_companies[];
    production_countries: production_country[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: spoken_language[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface movieDetailsHeaderProps {
    movieDetails: movieDetailProps | tvDetailProps;
    movieCredits: movieCreditsProps | tvCreditsProps;
}

export interface OutletContextType {
    movieCredits: movieCreditsProps | tvCreditsProps;
    movieData: movieDetailProps | tvDetailProps;
    recommendations: movieProps[] | tvProps[];
}

export type collection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string | null;
};

type genres = {
    id: number;
    name: string;
};

type production_companies = {
    id: 508;
    logo_path: string;
    name: string;
    origin_country: string;
};
type production_country = {
    iso_3166_1: string;
    name: string;
};
type spoken_language = {
    iso_639_1: string;
    name: string;
};

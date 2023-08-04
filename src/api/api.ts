import axios from 'axios';
import { MovieProps } from '../types/MovieProps';
import { baseUrl } from '../lib/links';

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
    },
};

export const api = {
    movies: {
        async getTrendingAll(): Promise<MovieProps[]> {
            const {
                data: { results },
            } = await axios.get<TrendingResponse>(
                `${baseUrl}trending/all/day`,
                apiOptions
            );

            return results;
        },
        async getTrendingMovies(
            time: string,
            language: string
        ): Promise<MovieProps[]> {
            const {
                data: { results },
            } = await axios.get<TrendingResponse>(
                `${baseUrl}trending/movie/${time}?language=${language}`,
                apiOptions
            );

            return results;
        },
    },
};

interface TrendingResponse {
    results: MovieProps[];
}